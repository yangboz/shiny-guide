//
//  TGCameraGridView.m
//  TGCameraViewController
//
//  Created by Bruno Tortato Furtado on 19/09/14.
//  Copyright (c) 2014 Tudo Gostoso Internet. All rights reserved.
//
//  Permission is hereby granted, free of charge, to any person obtaining a copy
//  of this software and associated documentation files (the "Software"), to deal
//  in the Software without restriction, including without limitation the rights
//  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
//  copies of the Software, and to permit persons to whom the Software is
//  furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
//  THE SOFTWARE.

#import "TGCameraGridView.h"
#import "TGCameraColor.h"

@interface TGCameraGridView ()

- (void)setup;

@end



@implementation TGCameraGridView

- (instancetype)init
{
    self = [super init];
    
    if (self) {
        [self setup];
    }
    
    return self;
}

- (id)initWithCoder:(NSCoder *)aDecoder
{
    self = [super initWithCoder:aDecoder];
    
    if (self) {
        [self setup];
    }
    
    return self;
}

- (instancetype)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    
    if (self) {
        [self setup];
    }
    
    return self;
}

- (void)drawRect:(CGRect)rect
{
    CGContextRef context = UIGraphicsGetCurrentContext();
    CGContextSetLineWidth(context, self.lineWidth);
    CGContextSetStrokeColorWithColor(context, [TGCameraColor.grayColor colorWithAlphaComponent:.7].CGColor);
    
    CGFloat columnWidth = self.frame.size.width / (self.numberOfColumns + 1.0);
    CGFloat rowHeight = self.frame.size.height / (self.numberOfRows + 1.0);
    
    for (NSUInteger i = 1; i <= self.numberOfColumns; i++) {
        CGPoint startPoint;
        startPoint.x = columnWidth * i;
        startPoint.y = 0.0f;

        CGPoint endPoint;
        endPoint.x = startPoint.x;
        endPoint.y = self.frame.size.height;
        
        CGContextMoveToPoint(context, startPoint.x, startPoint.y);
        CGContextAddLineToPoint(context, endPoint.x, endPoint.y);
        CGContextStrokePath(context);
    }
 
    for (NSUInteger i = 1; i <= self.numberOfRows; i++) {
        CGPoint startPoint;
        startPoint.x = 0.0f;
        startPoint.y = rowHeight * i;

        CGPoint endPoint;
        endPoint.x = self.frame.size.width;
        endPoint.y = startPoint.y;
        
        CGContextMoveToPoint(context, startPoint.x, startPoint.y);
        CGContextAddLineToPoint(context, endPoint.x, endPoint.y);
        CGContextStrokePath(context);
        CGContextSetFillColorWithColor(context,
                                       [UIColor redColor].CGColor);
    }
    //draw tonue area,@see: http://www.techotopia.com/index.php/An_iOS_7_Graphics_Tutorial_using_Core_Graphics_and_Core_Image
//    CGContextMoveToPoint(context, columnWidth * 1, rowHeight * 2);
//    CGContextAddQuadCurveToPoint(context, columnWidth * 1,rowHeight * 2.5,columnWidth * 2, rowHeight * 2.5);
//    CGContextStrokePath(context);
    // Quadratic Bézier curve
    //add tongue area indicator image
//    //@see: http://stackoverflow.com/questions/17557417/adding-a-uiimage-view-as-a-subview-to-an-instance-of-uiview
//    //You need to specify the frame of the view
    
    UIImage *image = [UIImage imageNamed:@"frame"];
    UIImageView *imageView = [[UIImageView alloc] initWithImage:image];
    UIView *catView = [[UIView alloc] initWithFrame:CGRectMake(0,0, self.frame.size.width*.7,self.frame.size.height)];
    //specify the frame of the imageView in the superview , here it will fill the superview
    imageView.frame = catView.bounds;
    // add the imageview to the superview
    [catView addSubview:imageView];
    //add the view to the main view
    [self addSubview:catView];
    //center horizontallly
    CGPoint center = catView.center;
    center.x = self.center.x;
    catView.center = center;
}


#pragma mark -
#pragma mark - Private methods

- (void)setup
{
    self.backgroundColor = [UIColor clearColor];
    self.lineWidth = .8;
}

@end
