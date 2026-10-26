#!/usr/bin/env python3
"""Drop images into the project folders under 'images', then run this (or double-click update.bat).

images/
  Portfolio/                    home-page picture collage
      hero1  hero2  hero3
  LLM_Based_Navigation/         cover, demo1, demo2, gallery1
  AT_IntelliRover/              cover, gallery1..gallery4
  Quadruped_Robot/              cover, demo1, gallery1..gallery3
  Mini_Swarm_Vehicle/           cover, gallery1..gallery4
  Industrial_Fault_Simulator/   cover, gallery1..gallery5
  Drone_Obstacle_Avoidance/     cover

Name each file as shown (any of .png .jpg .gif .webp), e.g. images/LLM_Based_Navigation/demo1.gif.
Only files that changed since the last run are re-embedded. Captions are not changed by this script."""
import base64, hashlib, io, json, os, re, sys
from PIL import Image

HTML, ROOT = "index.html", "images"
CACHE = os.path.join(ROOT, ".cache.json")
EXTS = (".gif", ".png", ".jpg", ".jpeg", ".webp")

MAP = {
 "Portfolio": {"hero1": "hero1", "hero2": "hero2", "hero3": "hero3"},
 "LLM_Based_Navigation": {"cover": "tb_gui", "demo1": "tb_demo", "demo2": "tb_nav", "gallery1": "tb_rviz"},
 "AT_IntelliRover": {"cover": "rover_main", "gallery1": "rover_3d", "gallery2": "rover_block",
                     "gallery3": "rover_elec", "gallery4": "rover_pcb"},
 "Quadruped_Robot": {"cover": "quad_on", "demo1": "quad_walk", "gallery1": "quad_top",
                     "gallery2": "quad_sim", "gallery3": "quad_block"},
 "Mini_Swarm_Vehicle": {"cover": "swarm_b1", "gallery1": "swarm_b3", "gallery2": "swarm_render",
                        "gallery3": "swarm_cad", "gallery4": "swarm_sys"},
 "Industrial_Fault_Simulator": {"cover": "rig_photo", "gallery1": "rig_sim", "gallery2": "rig_lv",
                                "gallery3": "rig_plot", "gallery4": "rig_new", "gallery5": "rig_cad1"},
 "Drone_Obstacle_Avoidance": {"cover": "drone"},
}

def to_uri(path):
    im = Image.open(path)
    frames = getattr(im, "n_frames", 1)
    width, quality = (420, 70) if frames > 1 else (900, 75)
    def rs(f):
        f = f.convert("RGBA") if f.mode not in ("RGB", "RGBA") else f
        if f.width > width:
            f = f.resize((width, round(f.height * width / f.width)), Image.LANCZOS)
        return f
    buf = io.BytesIO()
    if frames > 1:
        out, durs = [], []
        for i in range(frames):
            im.seek(i); durs.append(im.info.get("duration", 100)); out.append(rs(im.copy()))
        out[0].save(buf, "WEBP", save_all=True, append_images=out[1:], duration=durs,
                    loop=0, quality=quality, method=6)
    else:
        rs(im).save(buf, "WEBP", quality=quality, method=6)
    data = buf.getvalue()
    return "data:image/webp;base64," + base64.b64encode(data).decode(), len(data) // 1024

def main():
    os.makedirs(ROOT, exist_ok=True)
    for folder in MAP:
        os.makedirs(os.path.join(ROOT, folder), exist_ok=True)
    cache = json.load(open(CACHE)) if os.path.exists(CACHE) else {}
    s = open(HTML, encoding="utf-8", newline="").read()
    changed = 0

    jobs = []  # (label, path, key)
    for folder in sorted(os.listdir(ROOT)):
        d = os.path.join(ROOT, folder)
        if not os.path.isdir(d):
            continue
        for fn in sorted(os.listdir(d)):
            stem, ext = os.path.splitext(fn)
            if ext.lower() in EXTS:
                jobs.append((f"{folder}/{fn}", os.path.join(d, fn), MAP.get(folder, {}).get(stem, stem), f"{folder}/{stem}"))

    for label, path, key, ck in jobs:
        h = hashlib.md5(open(path, "rb").read()).hexdigest()
        if cache.get(ck) == h:
            print(f"skip    {label} (unchanged)"); continue
        pat = re.compile(r'("%s": ")data:[^"]+(")' % re.escape(key))
        if not pat.search(s):
            print(f"NOTE    {label}: not a known picture name, skipped (see the list at the top of sync_images.py)")
            continue
        uri, kb = to_uri(path)
        s = pat.sub(lambda m: m.group(1) + uri + m.group(2), s, count=1)
        cache[ck] = h; changed += 1
        print(f"update  {label} -> {kb} KB")

    if changed:
        open(HTML, "w", encoding="utf-8", newline="").write(s)
        json.dump(cache, open(CACHE, "w"))
    print(f"\nDone. {changed} image(s) updated in {HTML}.")

main()
