//
//  PopupViewController.m
//  TGCameraViewController
//
//  Created by yangboz on 2016/11/30.
//  Copyright © 2016年 Tudo Gostoso Internet. All rights reserved.
//

#import "PopupViewControllerInquiry.h"
#import "DataModel.h"
#import "Constants.h"

@interface PopupViewControllerInquiry ()<CLUploaderDelegate,UIPickerViewDelegate>
{
    NSArray *_pickerData;
}
@end

@implementation PopupViewControllerInquiry
{
    CLCloudinary *cloudinary;
    DataModel *dataModel;
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
    UIImage *image =[dataModel getImage];
        self.photoView.image = image;
    //Cloudinary Safe mobile uploading,@see: https://github.com/cloudinary/cloudinary_ios
    cloudinary = [[CLCloudinary alloc] initWithUrl: @"cloudinary://445785421588325:EmFqoMzkE_99t-2caS4h-z0FEp4@dxlwdcgq0y"];
    // Initialize Data
    _pickerData = @[kDoctor_name01, kDoctor_name02];
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
NSLog(@"nextBtnDidTap");
    CLUploader* mobileUploader = [[CLUploader alloc] init:cloudinary delegate:self];
    NSData *imageData = UIImageJPEGRepresentation(_photoView.image, 1.0); // 1.0 is JPG quality
//    NSData *imageData = [NSData dataWithContentsOfFile:imageUrl];
    [mobileUploader upload:imageData options:@{}];
    //@see https://github.com/jdg/MBProgressHUD
    [MBProgressHUD showHUDAddedTo:self.view animated:YES];
    
}
#pragma mark CLUploader delegate
- (void) uploaderSuccess:(NSDictionary*)result context:(id)context {
    NSString* publicId = [result valueForKey:@"public_id"];
    NSLog(@"Upload success. Public ID=%@, Full result=%@", publicId, result);
    //Save url to local data model.
    NSString *Url = [result objectForKey:@"url"];
     [MBProgressHUD hideHUDForView:self.view animated:YES];
    //type{0:inquiry,1:reply}
    AppDelegate *appdelegate = (AppDelegate*)[[UIApplication sharedApplication] delegate];
NSString *messages = [NSString stringWithFormat:@"%@||%@||%@", Url, _textView.text,kpopup_type_inquiry];
    //Save message info
    NSMutableDictionary* msgInfo = [NSMutableDictionary dictionaryWithObjectsAndKeys:Url,@"image",_textView.text, @"desc",kpopup_type_inquiry,@"type",nil];
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
#pragma mark Cloudinary delegation
- (void) uploaderError:(NSString*)result code:(int) code context:(id)context {
    NSLog(@"Upload error: %@, %d", result, code);
    UIAlertView * alert =[[UIAlertView alloc ] initWithTitle:@"Error"
                                                     message:@"Upload Error"
                                                    delegate:self
                                           cancelButtonTitle:@"OK"
                                           otherButtonTitles: nil];
    
        [alert show];
}

- (void) uploaderProgress:(NSInteger)bytesWritten totalBytesWritten:(NSInteger)totalBytesWritten totalBytesExpectedToWrite:(NSInteger)totalBytesExpectedToWrite context:(id)context {
    NSLog(@"Upload progress: %ld/%ld (+%ld)", (long)totalBytesWritten, (long)totalBytesExpectedToWrite, (long)bytesWritten);
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
}

@end
