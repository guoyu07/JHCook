//
//  TimeOutManager.m
//  JHCook
//
//  Created by 李雨龙 on 16/4/11.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "TimeOutManager.h"
#import <objc/runtime.h>
#define TIMER_SELECTOR @"TIMER_SELECTOR"
#define TIMER_OUT_BLOCK @"TIMER_OUT_BLOCK"
@implementation TimeOutManager

+ (void)timerOut:(TimeOutBlock) timerOutBlock{
  NSLog(@"%s",__func__);
}
+ (void)success:(SuccessBlock) success{
}
+ (void)startWithTimeOut:(NSTimeInterval)timeOut  finally:(TimeOutBlock) response{
  NSLog(@"%s",__func__);
  objc_setAssociatedObject(self, TIMER_OUT_BLOCK, response, OBJC_ASSOCIATION_COPY_NONATOMIC);
  
  [self performSelector:@selector(timerOut:) withObject:self afterDelay:timeOut inModes:@[NSRunLoopCommonModes]];
}
+ (void)canceTimer{

TimeOutBlock timerBlock =  objc_getAssociatedObject(self, TIMER_OUT_BLOCK);
  [NSObject cancelPreviousPerformRequestsWithTarget:self];
  
  [NSObject cancelPreviousPerformRequestsWithTarget:self selector:@selector(timerOut:) object:nil];
}
@end
