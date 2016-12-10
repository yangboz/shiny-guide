//
//  PopupViewController.m
//  TGCameraViewController
//
//  Created by yangboz on 2016/11/30.
//  Copyright © 2016年 Tudo Gostoso Internet. All rights reserved.
//

#import "PopupViewControllerResult.h"
#import "DataModel.h"
#import "Constants.h"
#import <SDWebImage/UIImageView+WebCache.h>

@interface PopupViewControllerResult ()<CLUploaderDelegate,UIPickerViewDelegate>
{
    NSArray *_pickerData;
}
@end

@implementation PopupViewControllerResult
{
    DataModel *dataModel;
    NSDictionary* msgInfo;
    NSString *imageStr;
    NSString *descStr;
    NSString *typeStr;
    NSString *instructStr;
}

- (instancetype)init
{
    if (self = [super init]) {
        
    }
    return self;
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    dataModel =[DataModel sharedInstance];
    dataModel =[DataModel sharedInstance];
    msgInfo = [[DataModel sharedInstance] getMsgInfo];
    imageStr = [msgInfo objectForKey:@"image"];
    descStr =[msgInfo objectForKey:@"desc"];
    typeStr = [msgInfo objectForKey:@"type"];
    instructStr = [msgInfo objectForKey:@"instruct"];
    //
    [self.photoView sd_setImageWithURL:[NSURL URLWithString:imageStr]
                      placeholderImage:[UIImage imageNamed:@"placeholder"]
                               options:SDWebImageRefreshCached];

    self.textView.text = descStr;
    // Initialize Data
    _pickerData = @[kInstruct_01, kInstruct_02];
    self.textView.text = descStr;
    // typically inside of the -(void) viewDidLoad method
    self.textResultView.layer.borderWidth = 1.0f;
    self.textResultView.layer.borderColor = [[UIColor grayColor] CGColor];
    self.textResultView.text =instructStr;
}

- (void)viewDidLayoutSubviews
{
    [super viewDidLayoutSubviews];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}
- (void)nextBtnDidTap
{
    NSLog(@"ReplyBtnDidTap");
    [self.popupController dismiss];
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
