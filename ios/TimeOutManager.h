//
//  TimeOutManager.h
//  JHCook
//
//  Created by 李雨龙 on 16/4/11.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
typedef void(^TimeOutBlock)(id response);
typedef void(^SuccessBlock)(id response);
@interface TimeOutManager : NSObject
+ (void)startWithTimeOut:(NSTimeInterval)timeOut finally:(TimeOutBlock) response;
+ (void)canceTimer;
@end
