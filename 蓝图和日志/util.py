#-*-coding:utf-8-*-
import logging


import logging
from logging.handlers import RotatingFileHandler

# 创建一个logger
'''
logging是一个全局模块 实例话一次就行啦
不能写到logg函数内部
不然每次调用logg函数都会实例化一次
'''


logger = logging.getLogger('mylogger')
fh = logging.FileHandler('log.log')         #写到日志
ch = logging.StreamHandler()                   #写到控制台
Rthandler = RotatingFileHandler('log.log', maxBytes=1024*1025*3, backupCount=3)        #控制日志大小


def logg(if_print_log = False):

    logger.setLevel(logging.DEBUG)

    # 创建一个handler，用于写入日志文件
    fh.setLevel(logging.DEBUG)

    # 再创建一个handler，用于输出到控制台
    ch.setLevel(logging.DEBUG)

    # 定义handler的输出格式
    formatter = logging.Formatter('%(asctime)s %(filename)s[line:%(lineno)d] %(levelname)s %(message)s')

    fh.setFormatter(formatter)
    ch.setFormatter(formatter)

    # 给logger添加handler

    # logger.addHandler(fh)         #执行将日志写到文件中    和虾面同时开启的话,会同时写入两条log
    if if_print_log:
        logger.addHandler(ch)



    Rthandler.setLevel(logging.DEBUG)
    Rthandler.setFormatter(formatter)
    logger.addHandler(Rthandler)                #也会执行将日志写如到文件中 并控制文件大小


    # 记录一条日志
    return logger
