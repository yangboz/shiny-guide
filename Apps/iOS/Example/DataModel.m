//
//  DataModel.m
//  TGCameraViewController
//
//  Created by yangboz on 2016/12/1.
//  Copyright © 2016年 Tudo Gostoso Internet. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "DataModel.h"
//@see http://stackoverflow.com/questions/7568935/how-do-i-implement-an-objective-c-singleton-that-is-compatible-with-arc
@implementation DataModel

//It declares a static instance of your singleton object and initializes it to nil.
static DataModel *sharedInstance = nil;
static UIImage *image=nil;
static NSInteger role;
static NSString *uuid;
static NSMutableDictionary *msgInfo = nil;




//In your class factory method for the class (named something like “sharedInstance” or “sharedManager”), it generates an instance of the class but only if the static instance is nil.
+ (instancetype)sharedInstance
{
    static DataModel *sharedInstance = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        sharedInstance = [[DataModel alloc] init];
        // Do any other initialisation stuff here
    });
    return sharedInstance;
}

//implementations
#pragma mark Image
//Sets
-(void)setImage:(UIImage *)value{
    image = value;
}
//Gets
-(UIImage *)getImage{
    return image;
}
-(void)setRole:(NSInteger)value{
    role = value;
}
-(NSInteger)getRole{
    return role;
}
-(void)setUuid:(NSString *)value{
    uuid = value;
}
-(NSString *)getUuid{
    return uuid;
}
-(void)setMsgInfo:(NSMutableDictionary *)value{
    msgInfo = value;
}
-(NSMutableDictionary *)getMsgInfo{
    return msgInfo;
}

@end
