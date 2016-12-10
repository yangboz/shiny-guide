    //
//  PopupViewController.m
//  TGCameraViewController
//
//  Created by yangboz on 2016/11/30.
//  Copyright © 2016年 Tudo Gostoso Internet. All rights reserved.
//

#import "PopupViewControllerReply.h"
#import "DataModel.h"
#import "Constants.h"
#import <SDWebImage/UIImageView+WebCache.h>

@interface PopupViewControllerReply ()<CLUploaderDelegate,UIPickerViewDelegate>
{
    NSArray *_pickerData;
    NSString *instructStr;
}
@end

@implementation PopupViewControllerReply
{
    DataModel *dataModel;
    NSMutableDictionary* msgInfo;
    NSString *imageStr;
    NSString *descStr;
    NSString *typeStr;
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
    msgInfo = [[DataModel sharedInstance] getMsgInfo];
    imageStr = [msgInfo objectForKey:@"image"];
    descStr =[msgInfo objectForKey:@"desc"];
    typeStr = [msgInfo objectForKey:@"type"];
    [self.photoView sd_setImageWithURL:[NSURL URLWithString:imageStr]
                 placeholderImage:[UIImage imageNamed:@"placeholder"]
                          options:SDWebImageRefreshCached];
    
    self.textView.text = descStr;
    // Initialize Data
    _pickerData = @[kInstruct_01, kInstruct_02];
    // Connect data:
    self.pickerView.delegate = self;
    self.pickerView.dataSource = self;
}

- (void)viewDidLayoutSubviews
{
    [super viewDidLayoutSubviews];
}

- (void)nextBtnDidTap
{
NSLog(@"ReplyBtnDidTap");
    AppDelegate *appdelegate = (AppDelegate*)[[UIApplication sharedApplication] delegate];
    //
    NSString *messages = [NSString stringWithFormat:@"%@||%@||%@||%@", imageStr, descStr,kpopup_type_reply,instructStr];
    //update message info
    [msgInfo setValue: kpopup_type_reply forKey:@"type"];
    [msgInfo setValue: instructStr forKey:@"instruct"];
    [[DataModel sharedInstance] setMsgInfo:msgInfo];
    //
    [appdelegate.client publish: messages toChannel:kTopic_name01 storeInHistory:YES
                 withCompletion:^(PNPublishStatus *status) {
                     
                     if (!status.isError) {
                         
                         // Message successfully published to specified channel.
                         [self.popupController dismiss];
                     }
                     else {
                         
                         /**
                          Handle message publish error. Check 'category' property to find
                          out possible reason because of which request did fail.
                          Review 'errorData' property (which has PNErrorData data type) of status
                          object to get additional information about issue.
                          
                          Request can be resent using: [status retry];
                          */
                     }
                 }];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/
#pragma mark UIPickerView

// The number of columns of data
- (int)numberOfComponentsInPickerView:(UIPickerView *)pickerView
{
    return 1;
}

// The number of rows of data
- (int)pickerView:(UIPickerView *)pickerView numberOfRowsInComponent:(NSInteger)component
{
    return _pickerData.count;
}

// The data to return for the row and component (column) that's being passed in
- (NSString*)pickerView:(UIPickerView *)pickerView titleForRow:(NSInteger)row forComponent:(NSInteger)component
{
    return _pickerData[row];
}


// Catpure the picker view selection
- (void)pickerView:(UIPickerView *)pickerView didSelectRow:(NSInteger)row inComponent:(NSInteger)component
{
    // This method is triggered whenever the user makes a change to the picker selection.
    // The parameter named row and component represents what was selected.
    NSLog(@"pickerView didSelectRow:%ld",(long)row);
    instructStr = _pickerData[row];
}

@end
