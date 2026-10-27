#!/usr/bin/env python3
"""Shrinks heavy pictures so the site stays fast.

Put photos / screenshots / GIFs anywhere inside the 'images' folder (e.g. images/AT_IntelliRover/gallery5.png),
then run this script (or double-click optimize.bat).

  * .png / .jpg / .jpeg  -> .webp, max 1200 px wide
  * .gif                 -> .mp4 video if ffmpeg is installed (5-10x smaller), otherwise animated .webp, max 480 px wide
  * .webp                -> re-compressed only if it is bigger than 400 KB

The original file is moved to the 'originals' folder (never uploaded to GitHub).
It then prints the exact line to paste into data/projects.js."""
import os, shutil, subprocess, sys
from PIL import Image

ROOT, BACKUP = "images", "originals"
MAX_IMG, MAX_GIF, BIG = 1200, 480, 400 * 1024
HAS_FFMPEG = shutil.which("ffmpeg") is not None

def resize(im, w):
    if im.width > w:
        im = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
    return im

def backup(path):
    dest = os.path.join(BACKUP, os.path.relpath(path, ROOT))
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    shutil.move(path, dest)

def to_webp(path, out):
    im = Image.open(path)
    im = resize(im.convert("RGBA" if im.mode in ("RGBA", "P", "LA") else "RGB"), MAX_IMG)
    im.save(out, "WEBP", quality=78, method=6)

def gif_to_mp4(path, out):
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", path, "-movflags", "faststart",
                    "-pix_fmt", "yuv420p", "-vf", "scale='min(640,iw)':-2", "-an", "-crf", "30", out], check=True)

def gif_to_webp(path, out):
    im = Image.open(path)
    frames, durs = [], []
    for i in range(getattr(im, "n_frames", 1)):
        im.seek(i); durs.append(im.info.get("duration", 100))
        frames.append(resize(im.convert("RGBA"), MAX_GIF))
    frames[0].save(out, "WEBP", save_all=True, append_images=frames[1:], duration=durs, loop=0, quality=60, method=6)

def main():
    done = 0
    for d, _, files in os.walk(ROOT):
        for fn in sorted(files):
            p = os.path.join(d, fn); stem, ext = os.path.splitext(fn); ext = ext.lower()
            out = None
            if ext in (".png", ".jpg", ".jpeg"):
                out = os.path.join(d, stem + ".webp"); to_webp(p, out)
            elif ext == ".gif":
                if HAS_FFMPEG:
                    out = os.path.join(d, stem + ".mp4"); gif_to_mp4(p, out)
                else:
                    out = os.path.join(d, stem + ".webp"); gif_to_webp(p, out)
            elif ext == ".webp" and os.path.getsize(p) > BIG and getattr(Image.open(p), "n_frames", 1) == 1:
                bk = os.path.join(BACKUP, os.path.relpath(p, ROOT)); os.makedirs(os.path.dirname(bk), exist_ok=True)
                shutil.copy(p, bk); tmp = p + ".tmp"; to_webp(p, tmp); os.replace(tmp, p)
                print(f"shrunk  {p.replace(os.sep, '/')} -> {os.path.getsize(p)//1024} KB"); done += 1; continue
            else:
                continue
            if out != p: backup(p)
            print(f"ready   {out.replace(os.sep, '/')}  ({os.path.getsize(out)//1024} KB)"); done += 1
    print(f"\nDone. {done} file(s) processed." if done else "\nNothing to optimize - all images are already small.")
    print("Now add the path(s) above to data/projects.js, then commit and push.")

main()
