//
//  PopupViewController.h
//  TGCameraViewController
//
//  Created by yangboz on 2016/11/30.
//  Copyright © 2016年 Tudo Gostoso Internet. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "Cloudinary/Cloudinary.h"
#import "Cloudinary/CLUploader.h"
#import "MBProgressHUD.h"
#import <STPopup/STPopup.h>
#import <PubNub/PubNub.h>
#import "AppDelegate.h"

@interface PopupViewControllerResult : UIViewController
@property (weak, nonatomic) IBOutlet UIImageView *photoView;
@property (weak, nonatomic) IBOutlet UITextView *textResultView;
@property (weak, nonatomic) IBOutlet UITextField *textView;
@end
