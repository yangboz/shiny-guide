//
//  TGInitialViewController.m
//  TGCameraViewController
//
//  Created by Bruno Furtado on 15/09/14.
//  Copyright (c) 2014 Tudo Gostoso Internet. All rights reserved.
//

#import "TGInitialViewController.h"
#import "TGCameraViewController.h"
#import "DataModel.h"
#import "TongueFocusView.h"
#include <math.h>

@interface TGInitialViewController () <TGCameraDelegate,EAIntroDelegate,UIGestureRecognizerDelegate>
{
    STPopupController *popupController;
    UIView *rootView;
    EAIntroView *_intro;
    DataModel *dataModel;
    NSMutableDictionary *msgInfo;
}

@property (strong, nonatomic) IBOutlet UIImageView *photoView;
- (IBAction)actionTapped:(id)sender;
- (IBAction)introTapped:(id)sender;
- (IBAction)clearTapped:(id)sender;
- (IBAction)TGCameraTapped:(id)sender;
@end



@implementation TGInitialViewController
#pragma mark EAIntroViewsWithCustomViewFromNib
- (void)showIntro{
    EAIntroPage *page1 = [EAIntroPage page];
    page1.bgImage = [UIImage imageNamed:@"bg1"];
    page1.title = @"Characterization of tongue diagnosis.";
    page1.desc = @"one of important content of the modernization of traditional Chinese medicine (TCM).Tongue image is acquired by camera.";
    page1.titleIconView = [[UIImageView alloc] initWithImage:[UIImage imageNamed:@"icon1"]];
    
    EAIntroPage *page2 = [EAIntroPage page];
    page2.bgImage = [UIImage imageNamed:@"bg2"];
    page2.title = @"Characterization of tongue diagnosis.";
    page2.desc = @"one of important content of the modernization of traditional Chinese medicine (TCM).Tongue image is acquired by camera.";
    page2.titleIconView = [[UIImageView alloc] initWithImage:[UIImage imageNamed:@"icon2"]];
    
    EAIntroPage *page3 = [EAIntroPage page];
    page3.bgImage = [UIImage imageNamed:@"bg3"];
    page3.title = @"Characterization of tongue diagnosis.";
    page3.desc = @"one of important content of the modernization of traditional Chinese medicine (TCM).Tongue image is acquired by camera.";
    page3.titleIconView = [[UIImageView alloc] initWithImage:[UIImage imageNamed:@"icon3"]];
    
    EAIntroPage *page4 = [EAIntroPage page];
    page4.bgImage = [UIImage imageNamed:@"bg4"];
    page4.title = @"Characterization of tongue diagnosis.";
    page4.desc = @"one of important content of the modernization of traditional Chinese medicine (TCM).Tongue image is acquired by camera.";
    page4.titleIconView = [[UIImageView alloc] initWithImage:[UIImage imageNamed:@"icon4"]];
    
    EAIntroView *intro = [[EAIntroView alloc] initWithFrame:self.view.bounds andPages:@[page1,page2,page3,page4]];
    [intro setDelegate:self];
    
    [intro showInView:self.view animateDuration:0.3];
    _intro = intro;
}



#pragma mark - EAIntroView delegate

- (void)introDidFinish:(EAIntroView *)introView wasSkipped:(BOOL)wasSkipped {
    if(wasSkipped) {
        NSLog(@"Intro skipped");
    } else {
        NSLog(@"Intro finished");
    }
}



- (void)viewDidLoad
{
    [super viewDidLoad];
    
    // set custom tint color
    //[TGCameraColor setTintColor: [UIColor greenColor]];
    
    // save image to album
    [TGCamera setOption:kTGCameraOptionSaveImageToAlbum value:[NSNumber numberWithBool:YES]];
    
    // hide switch camera button
    //[TGCamera setOption:kTGCameraOptionHiddenToggleButton value:[NSNumber numberWithBool:YES]];
    
    // hide album button
    //[TGCamera setOption:kTGCameraOptionHiddenAlbumButton value:[NSNumber numberWithBool:YES]];
    
    // hide filter button
    //[TGCamera setOption:kTGCameraOptionHiddenFilterButton value:[NSNumber numberWithBool:YES]];

    
    _photoView.clipsToBounds = NO;
    // create and configure the pinch gesture
    UIPinchGestureRecognizer *pinchGestureRecognizer = [[UIPinchGestureRecognizer alloc] initWithTarget:self action:@selector(pinchGestureDetected:)];
    [pinchGestureRecognizer setDelegate:self];
    [_photoView addGestureRecognizer:pinchGestureRecognizer];
    
    // create and configure the rotation gesture
    UIRotationGestureRecognizer *rotationGestureRecognizer = [[UIRotationGestureRecognizer alloc] initWithTarget:self action:@selector(rotationGestureDetected:)];
    [rotationGestureRecognizer setDelegate:self];
    [_photoView addGestureRecognizer:rotationGestureRecognizer];
    
    // creat and configure the pan gesture
    UIPanGestureRecognizer *panGestureRecognizer = [[UIPanGestureRecognizer alloc] initWithTarget:self action:@selector(panGestureDetected:)];
    [panGestureRecognizer setDelegate:self];
    [_photoView addGestureRecognizer:panGestureRecognizer];
    //
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(reloadData:) name:@"reloadData" object:nil];
}
- (void)reloadData:(NSNotification *)notification
{
    if ([[NSThread currentThread] isMainThread]) {
        NSLog(@"main");
    } else {
        NSLog(@"not main");
    }
    dispatch_async(dispatch_get_main_queue(), ^{
        //do your UI
        NSDictionary *userInfo = [notification userInfo];
//        NSStr   ing *msgStr = [userInfo objectForKey:@"msg"];
        msgInfo = [[DataModel sharedInstance] getMsgInfo];
        NSString *type = [msgInfo objectForKey:@"type"];
        NSLog(@"notification type:%@",type);
        //
        UIViewController *popupViewController;
        if([type isEqualToString:kpopup_type_inquiry]){
            popupViewController = [[UIStoryboard storyboardWithName:@"Main" bundle:nil]instantiateViewControllerWithIdentifier:@"PopupViewControllerReply"];
            popupController = [[STPopupController alloc] initWithRootViewController:popupViewController];
            popupController.containerView.layer.cornerRadius = 4;
            [popupController presentInViewController:self];
        }else if ([type isEqualToString:kpopup_type_reply]){
            
            popupViewController = [[UIStoryboard storyboardWithName:@"Main" bundle:nil]instantiateViewControllerWithIdentifier:@"PopupViewControllerResult"];
            popupController = [[STPopupController alloc] initWithRootViewController:popupViewController];
            popupController.containerView.layer.cornerRadius = 4;
            [popupController presentInViewController:self];
        }else{
            NSLog(@"!!!Unknown popup type!!!");
        }
    });
    
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
}

#pragma mark -
#pragma mark - TGCameraDelegate required

- (void)cameraDidCancel
{
    [self dismissViewControllerAnimated:YES completion:nil];
}

- (void)cameraDidTakePhoto:(UIImage *)image
{
    _photoView.image = image;
    [self dismissViewControllerAnimated:YES completion:nil];
    
}

- (void)cameraDidSelectAlbumPhoto:(UIImage *)image
{
    _photoView.image = image;
    [self dismissViewControllerAnimated:YES completion:nil];
}

#pragma mark -
#pragma mark - TGCameraDelegate optional

- (void)cameraWillTakePhoto
{
    NSLog(@"%s", __PRETTY_FUNCTION__);
}

- (void)cameraDidSavePhotoAtPath:(NSURL *)assetURL
{
    NSLog(@"%s album path: %@", __PRETTY_FUNCTION__, assetURL);
}

- (void)cameraDidSavePhotoWithError:(NSError *)error
{
    NSLog(@"%s error: %@", __PRETTY_FUNCTION__, error);
}


#pragma mark -
#pragma mark - IBActions


- (IBAction)introTapped:(id)sender {
    [self showIntro];
}

- (IBAction)clearTapped:(id)sender {
    NSArray *viewsToRemove = [_photoView subviews];
    for (UIView *v in viewsToRemove) {
        [v removeFromSuperview];
    }
    _photoView.image = nil;
}
- (IBAction)searchTapped:(id)sender {
    
    [self detectFaces];
    //
//    CALayer *mask = [CALayer layer];
//    mask.contents = (id)_focusUIImageView.image.CGImage;
//    mask.frame = CGRectMake(0, 0, _focusUIImageView.bounds.size.width, _focusUIImageView.bounds.size.height);
//    _photoView.layer.mask = mask;
//    _photoView.layer.masksToBounds = YES;
}
- (IBAction)TGCameraTapped:(id)sender {
    TGCameraNavigationController *navigationController = [TGCameraNavigationController newWithCameraDelegate:self];
    [self presentViewController:navigationController animated:YES completion:nil];
}
- (IBAction)actionTapped:(id)sender{
    //
    PopupViewControllerInquiry *popupViewControllerInquiry = [[UIStoryboard storyboardWithName:@"Main" bundle:nil]instantiateViewControllerWithIdentifier:@"PopupViewControllerInquiry"];
    popupController = [[STPopupController alloc] initWithRootViewController:popupViewControllerInquiry];
    popupController.containerView.layer.cornerRadius = 4;
    [popupController presentInViewController:self];
    //Copy UIImage
    CGImageRef newCgIm = CGImageCreateCopy(_photoView.image.CGImage);
    UIImage *newImage = [UIImage imageWithCGImage:newCgIm scale:_photoView.image.scale
                                      orientation:_photoView.image.imageOrientation];
    [[DataModel sharedInstance] setImage:newImage];
}

// Below rates defines the size of the eyes and mouth circles in relationship with the whole face size
#define EYE_SIZE_RATE 0.3f
#define MOUTH_SIZE_RATE 0.4f

- (void)detectFaces
{
    // draw a CI image with the previously loaded face detection picture
    CIImage* image = [CIImage imageWithCGImage:_photoView.image.CGImage];
    
    // create a face detector - since speed is not an issue now we'll use a high accuracy detector
    CIDetector* detector = [CIDetector detectorOfType:CIDetectorTypeFace
                                              context:nil options:[NSDictionary dictionaryWithObject:CIDetectorAccuracyHigh forKey:CIDetectorAccuracy]];
    
    // create an array containing all the detected faces from the detector
    NSArray* features = [detector featuresInImage:image];
    
    
    // CoreImage coordinate system origin is at the bottom left corner and UIKit is at the top left corner
    // So we need to translate features positions before drawing them to screen
    // In order to do so we make an affine transform
    // **Note**
    // Its better to convert CoreImage coordinates to UIKit coordinates and
    // not the other way around because doing so could affect other drawings
    // i.e. In the original sample project you see the image and the bottom, Isn't weird?
    CGAffineTransform transform = CGAffineTransformMakeScale(1, -1);
    transform = CGAffineTransformTranslate(transform, 0, -_photoView.image.size.height);
    // we'll iterate through every detected face.  CIFaceFeature provides us
    // with the width for the entire face, and the coordinates of each eye
    // and the mouth if detected.  Also provided are BOOL's for the eye's and
    // mouth so we can check if they already exist.
    for(CIFaceFeature* faceFeature in features)
    {
        NSLog(@"transform:%@",NSStringFromCGAffineTransform(transform));
        // Translate CoreImage coordinates to UIKit coordinates
        const CGRect faceRect = CGRectApplyAffineTransform(faceFeature.bounds, transform);
        NSLog(@"faceRect:%@",NSStringFromCGRect(faceRect));

        // create a UIView using the bounds of the face
        UIView* faceView = [[UIView alloc] initWithFrame:faceRect];
        faceView.layer.borderWidth = 1;
        faceView.layer.borderColor = [[UIColor redColor] CGColor];
        
        // get the width of the face
        CGFloat faceWidth = faceFeature.bounds.size.width;
        
        // add the new view to create a box around the face
        [_photoView addSubview:faceView];
        // cropping the face test
//        CGImageRef imageRef = CGImageCreateWithImageInRect([_photoView.image CGImage], faceFeature.bounds);
//        [_photoView setImage:[UIImage imageWithCGImage:imageRef]];
//        CGImageRelease(imageRef);

        
        if(faceFeature.hasLeftEyePosition)
        {
            // Get the left eye position: Translate CoreImage coordinates to UIKit coordinates
            const CGPoint leftEyePos = CGPointApplyAffineTransform(faceFeature.leftEyePosition, transform);
            
            // Note1:
            // If you want to add this to the the faceView instead of the imageView we need to translate its
            // coordinates a bit more {-x, -y} in other words: {-faceFeature.bounds.origin.x, -faceFeature.bounds.origin.y}
            // You could do the same for the other eye and the mouth too.
            
            // Create an UIView to represent the left eye, its size depend on the width of the face.
            UIView* leftEyeView = [[UIView alloc] initWithFrame:CGRectMake(leftEyePos.x - faceWidth*EYE_SIZE_RATE*0.5f /*- faceFeature.bounds.origin.x*/, // See Note1
                                                                           leftEyePos.y - faceWidth*EYE_SIZE_RATE*0.5f /*- faceFeature.bounds.origin.y*/, // See Note1
                                                                           faceWidth*EYE_SIZE_RATE,
                                                                           faceWidth*EYE_SIZE_RATE)];
            leftEyeView.backgroundColor = [[UIColor magentaColor] colorWithAlphaComponent:0.3];
            leftEyeView.layer.cornerRadius = faceWidth*EYE_SIZE_RATE*0.5;
            //[faceView addSubview:leftEyeView];  // See Note1
            [_photoView addSubview:leftEyeView];
        }
        if(faceFeature.hasRightEyePosition)
        {
            // Get the right eye position translated to imageView UIKit coordinates
            const CGPoint rightEyePos = CGPointApplyAffineTransform(faceFeature.rightEyePosition, transform);
            
            // Create an UIView to represent the right eye, its size depend on the width of the face.
            UIView* rightEye = [[UIView alloc] initWithFrame:CGRectMake(rightEyePos.x - faceWidth*EYE_SIZE_RATE*0.5,
                                                                        rightEyePos.y - faceWidth*EYE_SIZE_RATE*0.5,
                                                                        faceWidth*EYE_SIZE_RATE,
                                                                        faceWidth*EYE_SIZE_RATE)];
            // make the right eye look nice and add it to the view
            rightEye.backgroundColor = [[UIColor blueColor] colorWithAlphaComponent:0.2];
            rightEye.layer.cornerRadius = faceWidth*EYE_SIZE_RATE*0.5;
            [_photoView addSubview:rightEye];
        }
        if(faceFeature.hasMouthPosition)
        {
            // Get the mouth position translated to imageView UIKit coordinates
            const CGPoint mouthPos = CGPointApplyAffineTransform(faceFeature.mouthPosition, transform);
            
            // Create an UIView to represent the mouth, its size depend on the width of the face.
            UIView* mouth = [[UIView alloc] initWithFrame:CGRectMake(mouthPos.x - faceWidth*MOUTH_SIZE_RATE*0.5,
                                                                     mouthPos.y - faceWidth*MOUTH_SIZE_RATE*0.5,
                                                                     faceWidth*MOUTH_SIZE_RATE,
                                                                     faceWidth*MOUTH_SIZE_RATE)];
    
            // make the mouth look nice and add it to the view
            mouth.backgroundColor = [[UIColor greenColor] colorWithAlphaComponent:0.3];
            mouth.layer.cornerRadius = faceWidth*MOUTH_SIZE_RATE*0.5;
            [_photoView addSubview:mouth];
            
//            // cropping the mouth test
//            CGImageRef imageRef = CGImageCreateWithImageInRect([_photoView.image CGImage], mouth.bounds);
//            [_photoView setImage:[UIImage imageWithCGImage:imageRef]];
//            CGImageRelease(imageRef);
            //TODO:Auto calibriate the tongue focus
//            CGPoint center = faceFeature.mouthPosition;
//            center.x = mouth.center.x;
//            center.y = mouth.center.y;
//            _focusUIImageView.center = center;
        }
    }
}
#pragma mark Guesture
- (void)pinchGestureDetected:(UIPinchGestureRecognizer *)recognizer
{
    UIGestureRecognizerState state = [recognizer state];
    
    if (state == UIGestureRecognizerStateBegan || state == UIGestureRecognizerStateChanged)
    {
        CGFloat scale = [recognizer scale];
        [recognizer.view setTransform:CGAffineTransformScale(recognizer.view.transform, scale, scale)];
        [recognizer setScale:1.0];
    }
}

- (void)rotationGestureDetected:(UIRotationGestureRecognizer *)recognizer
{
    UIGestureRecognizerState state = [recognizer state];
    
    if (state == UIGestureRecognizerStateBegan || state == UIGestureRecognizerStateChanged)
    {
        CGFloat rotation = [recognizer rotation];
        [recognizer.view setTransform:CGAffineTransformRotate(recognizer.view.transform, rotation)];
        [recognizer setRotation:0];
    }
}

- (void)panGestureDetected:(UIPanGestureRecognizer *)recognizer
{
    UIGestureRecognizerState state = [recognizer state];
    
    if (state == UIGestureRecognizerStateBegan || state == UIGestureRecognizerStateChanged)
    {
        CGPoint translation = [recognizer translationInView:recognizer.view];
        [recognizer.view setTransform:CGAffineTransformTranslate(recognizer.view.transform, translation.x, translation.y)];
        [recognizer setTranslation:CGPointZero inView:recognizer.view];
    }
}
@end
