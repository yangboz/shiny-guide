//
//  TGInitialViewController.h
//  TGCameraViewController
//
//  Created by Bruno Furtado on 15/09/14.
//  Copyright (c) 2014 Tudo Gostoso Internet. All rights reserved.
//

@import UIKit;
#import <EAIntroView/EAIntroView.h>
#import <STPopup/STPopup.h>
#import "PopupViewControllerInquiry.h"
#import "PopupViewControllerReply.h"
#import "PopupViewControllerResult.h"
#import "DataModel.h"
#import "Constants.h"
#import "GPUImage.h"


@interface TGInitialViewController : UIViewController
@property (weak, nonatomic) IBOutlet UISlider *filterSettingSlider;
- (IBAction)filterSettingSliderValueChanged:(id)sender;
@property (weak, nonatomic) IBOutlet UIImageView *focusUIImageView;
@end
