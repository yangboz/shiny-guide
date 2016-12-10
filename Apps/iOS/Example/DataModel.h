//
//  DataModel.h
//  TGCameraViewController
//
//  Created by yangboz on 2016/12/1.
//  Copyright © 2016年 Tudo Gostoso Internet. All rights reserved.
//

#ifndef DataModel_h
#define DataModel_h
#define ROLE_patient 0
#define ROLE_doctor 1

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import <PubNub/PubNub.h>
@interface DataModel : NSObject
{
    
}

+(DataModel *)sharedInstance;
//Set/Gets
-(void)setImage:(UIImage *)value;
-(UIImage *)getImage;
-(void)setRole:(NSInteger)value;
-(NSInteger)getRole;
-(void)setUuid:(NSString *)value;
-(NSString *)getUuid;
//notification's UserInfo
-(void)setMsgInfo:(NSMutableDictionary *)value;
-(NSMutableDictionary *)getMsgInfo;

@end



#endif /* DataModel_h */
