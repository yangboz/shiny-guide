//
//  AppDelegate.m
//  TGCameraViewController
//
//  Created by Bruno Tortato Furtado on 13/09/14.
//  Copyright (c) 2014 Tudo Gostoso Internet. All rights reserved.
//

#import "AppDelegate.h"
#import "Constants.h"

@interface AppDelegate ()
{
    
}
@end



@implementation AppDelegate


- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    // Initialize and configure PubNub client instance
    PNConfiguration *configuration = [PNConfiguration configurationWithPublishKey:@"pub-c-e52dce6c-e590-460f-9ce0-eb411da2d02d" subscribeKey:@"sub-c-a88848cc-b6b6-11e6-b697-0619f8945a4f"];
    self.client = [PubNub clientWithConfiguration:configuration];
    [self.client addListener:self];
    [self.client timeWithCompletion:^(PNTimeResult *result, PNErrorStatus *status) {
        
        if (!status) {
            
            // Handle downloaded server time token using: result.data.timetoken
        }
        else {
            
            /**
             Handle time token download error. Check 'category' property to find
             out possible reason because of which request did fail.
             Review 'errorData' property (which has PNErrorData data type) of status
             object to get additional information about issue.
             
             Request can be resent using: [status retry];
             */
        }
    }];
    // Subscribe to demo channel with presence observation
    NSArray *channelNames = [NSArray arrayWithObjects:kTopic_name01, nil ];
    [self.client subscribeToChannels: channelNames withPresence:YES];
    //http://stackoverflow.com/questions/26101395/local-notification-not-working-since-updating-to-ios-8-and-xcode-6
    if ([UIApplication instancesRespondToSelector:@selector(registerUserNotificationSettings:)]){
        [application registerUserNotificationSettings:[UIUserNotificationSettings settingsForTypes:UIUserNotificationTypeAlert|UIUserNotificationTypeBadge|UIUserNotificationTypeSound categories:nil]];
    }
    
    UILocalNotification *localNotification = [launchOptions objectForKey:UIApplicationLaunchOptionsLocalNotificationKey];
    if (localNotification) {
        application.applicationIconBadgeNumber = 0;
    }
    return YES;
}


// Handle new message from one of channels on which client has been subscribed.
- (void)client:(PubNub *)client didReceiveMessage:(PNMessageResult *)message {
    
    // Handle new message stored in message.data.message
    if (![message.data.channel isEqualToString:message.data.subscription]) {
        
        // Message has been received on channel group stored in message.data.subscription.
            }
    else {
        
        // Message has been received on channel stored in message.data.channel.
    }
    
    NSLog(@"Received message: %@ on channel %@ at %@", message.data.message,
          message.data.channel, message.data.timetoken);
    // Schedule the notification
    UILocalNotification* localNotification = [[UILocalNotification alloc] init];
    
    localNotification.fireDate = [NSDate dateWithTimeIntervalSinceNow:5];    localNotification.alertBody = message.data.message;
    localNotification.alertAction = @"一条新消息";
    localNotification.timeZone = [NSTimeZone defaultTimeZone];
    localNotification.applicationIconBadgeNumber = [[UIApplication sharedApplication] applicationIconBadgeNumber] + 1;
    
//    [[UIApplication sharedApplication] scheduleLocalNotification:localNotification];
    
    // Request to reload table view data
    [[NSNotificationCenter defaultCenter] postNotificationName:@"reloadData" object:self];
    
}
// New presence event handling.
- (void)client:(PubNub *)client didReceivePresenceEvent:(PNPresenceEventResult *)event {
    
    if (![event.data.channel isEqualToString:event.data.subscription]) {
        
        // Presence event has been received on channel group stored in event.data.subscription.
    }
    else {
        
        // Presence event has been received on channel stored in event.data.channel.
    }
    
    if (![event.data.presenceEvent isEqualToString:@"state-change"]) {
        
        NSLog(@"%@ \"%@'ed\"\nat: %@ on %@ (Occupancy: %@)", event.data.presence.uuid,
              event.data.presenceEvent, event.data.presence.timetoken, event.data.channel,
              event.data.presence.occupancy);
    }
    else {
        
        NSLog(@"%@ changed state at: %@ on %@ to: %@", event.data.presence.uuid,
              event.data.presence.timetoken, event.data.channel, event.data.presence.state);
    }
}
// Handle subscription status change.
- (void)client:(PubNub *)client didReceiveStatus:(PNStatus *)status {
    
    if (status.operation == PNSubscribeOperation) {
        
        // Check whether received information about successful subscription or restore.
        if (status.category == PNConnectedCategory || status.category == PNReconnectedCategory) {
            
            // Status object for those categories can be casted to `PNSubscribeStatus` for use below.
            PNSubscribeStatus *subscribeStatus = (PNSubscribeStatus *)status;
            if (subscribeStatus.category == PNConnectedCategory) {
                
                // This is expected for a subscribe, this means there is no error or issue whatsoever.
                
                // Select last object from list of channels and send message to it.
//                NSString *targetChannel = [client channels].lastObject;
//                [self.client publish: @"Hello from the PubNub Objective-C SDK"
//                           toChannel: targetChannel withCompletion:^(PNPublishStatus *publishStatus) {
//                               
//                               // Check whether request successfully completed or not.
//                               if (!publishStatus.isError) {
//                                   
//                                   // Message successfully published to specified channel.
//                               }
//                               else {
//                                   
//                                   /**
//                                    Handle message publish error. Check 'category' property to find out
//                                    possible reason because of which request did fail.
//                                    Review 'errorData' property (which has PNErrorData data type) of status
//                                    object to get additional information about issue.
//                                    
//                                    Request can be resent using: [publishStatus retry];
//                                    */
//                               }
//                           }];
            }
            else {
                
                /**
                 This usually occurs if subscribe temporarily fails but reconnects. This means there was
                 an error but there is no longer any issue.
                 */
            }
        }
        else if (status.category == PNUnexpectedDisconnectCategory) {
            
            /**
             This is usually an issue with the internet connection, this is an error, handle
             appropriately retry will be called automatically.
             */
        }
        // Looks like some kind of issues happened while client tried to subscribe or disconnected from
        // network.
        else {
            
            PNErrorStatus *errorStatus = (PNErrorStatus *)status;
            if (errorStatus.category == PNAccessDeniedCategory) {
                
                /**
                 This means that PAM does allow this client to subscribe to this channel and channel group
                 configuration. This is another explicit error.
                 */
            }
            else {
                
                /**
                 More errors can be directly specified by creating explicit cases for other error categories
                 of `PNStatusCategory` such as: `PNDecryptionErrorCategory`,
                 `PNMalformedFilterExpressionCategory`, `PNMalformedResponseCategory`, `PNTimeoutCategory`
                 or `PNNetworkIssuesCategory`
                 */
            }
        }
    }
}

- (void)application:(UIApplication *)application didReceiveLocalNotification:(UILocalNotification *)notification
{
//    UIApplicationState state = [application applicationState];
//    if (state == UIApplicationStateActive) {
//        UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"Reminder"
//                                                        message:notification.alertBody
//                                                       delegate:self cancelButtonTitle:@"OK"
//                                              otherButtonTitles:nil];
//        [alert show];
//    }
    
    // Request to reload popup view data
        NSDictionary* userInfo = [NSDictionary dictionaryWithObjectsAndKeys:notification.alertBody,@"msg",nil];
        [[NSNotificationCenter defaultCenter] postNotificationName:@"reloadData" object:self userInfo:userInfo];
        // Set icon badge number to zero
        application.applicationIconBadgeNumber = 0;
    
}
@end
