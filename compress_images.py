# -*- coding: utf-8 -*-
import os
from PIL import Image

IMG_DIR = r'C:\Users\13600\CodeBuddy\20260811191355\src\imports'
MAX_EDGE = 2048
THRESHOLD = 300 * 1024  # only compress files above this

def size_kb(p):
    return os.path.getsize(p) / 1024

for f in sorted(os.listdir(IMG_DIR)):
    p = os.path.join(IMG_DIR, f)
    if not os.path.isfile(p):
        continue
    low = f.lower()
    if not low.endswith(('.png', '.jpg', '.jpeg', '.webp')):
        continue
    if os.path.getsize(p) <= THRESHOLD:
        continue
    before = size_kb(p)
    try:
        im = Image.open(p)
        im.load()
    except Exception as e:
        print(f'  !! skip {f}: {e}')
        continue
    w, h = im.size
    if max(w, h) > MAX_EDGE:
        scale = MAX_EDGE / max(w, h)
        im = im.resize((int(w * scale), int(h * scale)), Image.LANCZOS)
    if low.endswith(('.jpg', '.jpeg')):
        if im.mode != 'RGB':
            im = im.convert('RGB')
        im.save(p, 'JPEG', quality=78, optimize=True, progressive=True)
    elif low.endswith('.png'):
        if im.mode == 'RGBA':
            # check if alpha actually used
            alpha = im.getchannel('A')
            if alpha.getextrema() == (255, 255):
                im = im.convert('RGB')
        elif im.mode == 'P':
            im = im.convert('RGBA')
            alpha = im.getchannel('A')
            if alpha.getextrema() == (255, 255):
                im = im.convert('RGB')
        else:
            im = im.convert('RGB')
        if im.mode == 'RGB':
            im = im.quantize(colors=192, method=Image.MEDIANCUT)
        im.save(p, 'PNG', optimize=True)
    elif low.endswith('.webp'):
        im.save(p, 'WEBP', quality=78, method=6)
    after = size_kb(p)
    print(f'{before:8.0f} KB -> {after:8.0f} KB  {f}')

print('done')
