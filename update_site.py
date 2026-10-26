#!/usr/bin/env python3
"""Update images/text in index.html without touching base64 by hand.

Usage:
  python update_site.py image <key> <file> [--width 900] [--quality 70]
      Replace the image stored under <key> (e.g. tb_gui, tb_rviz, tb_demo, tb_nav).
      PNG/JPG/GIF/WEBP in; compressed WebP out (animated GIFs stay animated).
  python update_site.py add-image <new_key> <file>
      Add a new image key, then reference it in the project's "gal" / "demo" list.
  python update_site.py text "<old text>" "<new text>"
      Exact find/replace; refuses to run unless <old text> appears exactly once.
  python update_site.py list
      Show all image keys and sizes.
"""
import argparse, base64, io, re, sys
from PIL import Image

PATH = "index.html"

def load():
    return open(PATH, encoding="utf-8", newline="").read()

def save(s):
    open(PATH, "w", encoding="utf-8", newline="").write(s)

def to_webp_uri(file, width, quality):
    im = Image.open(file)
    frames = getattr(im, "n_frames", 1)
    def resize(f):
        f = f.convert("RGBA") if f.mode not in ("RGB", "RGBA") else f
        if f.width > width:
            f = f.resize((width, round(f.height * width / f.width)), Image.LANCZOS)
        return f
    buf = io.BytesIO()
    if frames > 1:
        out, durs = [], []
        for i in range(frames):
            im.seek(i)
            durs.append(im.info.get("duration", 100))
            out.append(resize(im.copy()))
        out[0].save(buf, "WEBP", save_all=True, append_images=out[1:],
                    duration=durs, loop=0, quality=quality, method=6)
    else:
        resize(im).save(buf, "WEBP", quality=quality, method=6)
    data = buf.getvalue()
    print(f"  -> {len(data)//1024} KB WebP ({frames} frame(s))")
    return "data:image/webp;base64," + base64.b64encode(data).decode()

def main():
    ap = argparse.ArgumentParser()
    sub = ap.add_subparsers(dest="cmd", required=True)
    a = sub.add_parser("image"); a.add_argument("key"); a.add_argument("file")
    a.add_argument("--width", type=int, default=900); a.add_argument("--quality", type=int, default=70)
    b = sub.add_parser("add-image"); b.add_argument("key"); b.add_argument("file")
    b.add_argument("--width", type=int, default=900); b.add_argument("--quality", type=int, default=70)
    c = sub.add_parser("text"); c.add_argument("old"); c.add_argument("new")
    sub.add_parser("list")
    args = ap.parse_args()
    s = load()

    if args.cmd == "list":
        for k, v in re.findall(r'"(\w+)": "(data:[^"]+)"', s):
            print(f"{k:14s} {len(v)//1024:6d} KB")
        return

    if args.cmd == "text":
        n = s.count(args.old)
        if n != 1:
            sys.exit(f"Expected exactly 1 match, found {n}. Make the text more specific.")
        save(s.replace(args.old, args.new)); print("Updated."); return

    uri = to_webp_uri(args.file, args.width, args.quality)
    pat = re.compile(r'("%s": ")data:[^"]+(")' % re.escape(args.key))
    if args.cmd == "image":
        if not pat.search(s):
            sys.exit(f'Key "{args.key}" not found. Run: python update_site.py list')
        s = pat.sub(lambda m: m.group(1) + uri + m.group(2), s, count=1)
    else:
        if pat.search(s):
            sys.exit(f'Key "{args.key}" already exists; use the "image" command.')
        s = s.replace("const I={", 'const I={"%s": "%s", ' % (args.key, uri), 1)
        print(f'Added. Now reference "{args.key}" in the project\'s "gal" or "demo" list.')
    save(s); print("Updated", PATH)

main()
