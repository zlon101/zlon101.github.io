- etc目录用来存放系统中的配置文件
- bin(Binary)表示是二进制,Bin文件夹里存放的是二进制的文件，一般是exe，Dll之类的了编译后可运行程序了。
- Lib文件是编译连接的时候需要用到的;而运行的时候需要bin\dll（动态库），需要和exe文件在一起



DLL、Lib、    应用程序并不是一个完整的可执行文件，它们被分割成一些相对独立的动态链接库，即DLL文件，放置于系统中。当我们执行某一个程序时，相应的DLL文件就会被调用。一个应用程序可使用多个DLL文件，一个DLL文件也可能被不同的应用程序使用，这样的DLL文件被称为共享DLL文件。

- pragma comment(lib,"makeDLL.lib") (需要配置链接器) //指定与静态库一起链接，手动包含（标题3所示）之后可以省略     

- pragma comment(lib, "..\\..\\SimpleDLL\\Release\\SimpleDLL.lib") //添加lib文件引用     

  

Linux下生成引用动态库    将文件编译成.so格式的动态链接库    gcc -o libme.so wso.c -shared  将wso.c编译成 libme.so 库名为me        lib so为前缀跟后缀所以在VS中开发C++程序，我们一般是这样设置的：

    In C++, you got the header files (.h), the (.lib) files and the (.dll) files.
    In Visual Studio, you provide the location to search for these files in three different places:
    Configuration Properties => C/C++ => General => Additional Include directories. Here you list out the "include" directories that you want searched and made available.
    Configuration Properties => Linker => General => Additional Library directories. Here you list out the "lib" directories that you want to be searched and made available.
    Configuration Properties => Linker => Input => Additional dependencies. Here you explicitly specify the .lib files that want to include.- 安装gcc：yum install gcc     dev：development(开发)     编译：g++ test.cpp -o joyce     运行： ./a.out
    \- 编译C程序，对hello.c进行编译，生成hello文件：gcc -o hello hello.c- 只生成中间代码hello.o：         gcc -c hello hello.c- 对中间代码进行链接运行；     gcc -o hello.out hello.c
    创建文件：touch text        vim fileName新建目录：mkdir czl          mkdir -p home/czl/Tmp
    
    切换用户：su(切换为root)    su usrName(切换为usrName)
    解压文件    tar xzvf wxGTK-2.8.12.tar.gz    tar -xzvf codeblocks_16.01.tar.gz 解压下载的压缩文件



cmd测试远程某IP端口是否开放： telnet ip地址 端口号



## 特殊目录

-  /   表示根目录
-  ~   当前用户主目录,在home/
-  .   表示当前目录     
- ./  表示当前目录     
- ../ 表示当前目录的父目录     
- ..  同上    

## 添加环境变量

PATH="${PATH}:/usr/home/dever"          将/usr/home/dever添加到环境变量    # python pip install --upgrade pip          升级pip# ln -s python# yum install zlib

  \- make clean- make- make install- export PATH=~/anaconda3/bin:$PATH          添加环境变量
  \- 添加python3.6安装包并安装     sudo apt-get install software-properties-common     sudo add-apt-repository ppa:jonathonf/python-3.6     sudo apt-get update     sudo apt-get install python3.6
  ===============================================================     Samba配置===============================================================搜索：linux samba 共享
  测试配置文件:        testparm重启Samba服务:    service smb restart查看状态：            smbstatus
  linux ip地址:  172.18.19.157(ifconfig得到，内网IP)          公网ip: 120.79.83.20         win IP:            192.168.0.100        192.168.43.27(手机wife)