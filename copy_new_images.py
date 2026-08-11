# -*- coding: utf-8 -*-
import shutil, os

base_dst = r'C:\Users\13600\CodeBuddy\20260811191355\src\imports'
base_src = r'D:\Desktop\个人主页其他素材'

# 覆盖知识问答产品图
shutil.copy(f'{base_src}\\知识问答产品图.png', f'{base_dst}\\feishuQA.png')
print('copied 知识问答产品图.png -> feishuQA.png')

# 替换排练日常为原创活动（代码 import 的是 .jpg）
club3_png = f'{base_dst}\\clubNew3.png'
if os.path.exists(club3_png):
    os.remove(club3_png)
shutil.copy(f'{base_src}\\微信图片_20260512150917.png', f'{base_dst}\\clubNew3.jpg')
print('copied 微信图片_20260512150917.png -> clubNew3.jpg')

# 替换现场特写的竖屏图为陈宇迪5.jpg（紫色衣服赛场图）
shutil.copy(f'{base_src}\\陈宇迪5.jpg', f'{base_dst}\\clubNew1.jpg')
print('copied 陈宇迪5.jpg -> clubNew1.jpg')
