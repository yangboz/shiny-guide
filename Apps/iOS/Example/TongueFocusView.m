//
//  TongueFocusView.m
//  TGCameraViewController
//
//  Created by yangboz on 2016/12/11.
//  Copyright © 2016年 Tudo Gostoso Internet. All rights reserved.
//

#import "TongueFocusView.h"

@implementation TongueFocusView


// Only override drawRect: if you perform custom drawing.
// An empty implementation adversely affects performance during animation.
- (void)drawRect:(CGRect)rect {
    // Drawing code
    // Enable dragging
    [self enableDragging];
//    //You need to specify the frame of the view
//    UIImage *image = [UIImage imageNamed:@"focus"];
//    UIImageView *imageView = [[UIImageView alloc] initWithImage:image];
//    UIView *catView = [[UIView alloc] initWithFrame:CGRectMake(0,0, self.frame.size.width,self.frame.size.height)];
//    //specify the frame of the imageView in the superview , here it will fill the superview
//    imageView.frame = catView.bounds;
//    // add the imageview to the superview
//    [catView addSubview:imageView];
//    //add the view to the main view
//    [self addSubview:catView];
//    //center horizontallly
//    CGPoint center = catView.center;
//    center.x = self.center.x;
//    catView.center = center;
}

@end
