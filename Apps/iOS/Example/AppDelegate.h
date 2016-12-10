//
//  AppDelegate.h
//  TGCameraViewController
//
//  Created by Bruno Tortato Furtado on 13/09/14.
//  Copyright (c) 2014 Tudo Gostoso Internet. All rights reserved.
//

@import UIKit;
#import <PubNub/PubNub.h>
#import "DataModel.h"

@interface AppDelegate : UIResponder <UIApplicationDelegate,PNObjectEventListener>

@property (strong, nonatomic) UIWindow *window;
// Stores reference on PubNub client to make sure what it won't be released.
@property (nonatomic, strong) PubNub *client;

@end
