## 查找文件

- find /xx -iname "brew*"
  https://www.jianshu.com/p/7a5851e1a900
- which：查命令位置
- whereis：查环境变量内文件位置
- mdfind -name "name"
  mdfind命令就是Spotlight功能的终端界面

## 其他

- 查看当前环境shell

  ```
  echo $SHELL
  ```

- 复制文件：cp test czl/Tmp

- 复制目录：cp -r czl czl2

- 删除文件：rm test             rm -f czl（强制删除）删除目录：rm -rf czl
  递归删除目录下全部文件夹中的指定文件:  `find out/  -name fingerprint.default_WFH.so  |xargs rm -rf`  

- 移动文件：mv 源目录文件 目的目录重命名：  mv 旧的文件名 新的文件名

- 新建文件：`touch file.xx`

## 查看端口占用

lsof -i:8080

ps -ef | grep nginx

## 查看进程号

- ps -ef | grep nginx
- kill -QUIT 进程号
- kill -9 nginx: 强制停止

## 参考

[mac终端命令&快捷键](https://www.jianshu.com/p/aebb526c3a86)  