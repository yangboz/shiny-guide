Pod::Spec.new do |s|
  s.name = 'TGCameraViewController'
  s.version = '2.2.7'
  s.license = { :type => 'MIT', :file => 'LICENSE' }
  s.summary = 'Custom camera with AVFoundation. Beautiful, light and easy to integrate with iOS projects.'
  s.homepage = 'https://github.com/tdginternet/TGCameraViewController'
  s.screenshot  = "http://s28.postimg.org/eeli1omct/TGCamera_View_Controller.png"
  
  s.requires_arc = true
  s.platform = :ios
  s.ios.deployment_target = '8.0'
  
  s.authors = { 'Bruno Tortato Furtado' => 'bruno@furtado.me', 'Mario Cecchi' => 'macecchi@gmail.com' }
  
  s.ios.frameworks = 'AssetsLibrary', 'AVFoundation', 'CoreImage', 'Foundation', 'MobileCoreServices', 'UIKit'
  s.source_files = 'TGCameraViewController/**/*.{h,m}'
  s.resources = ['TGCameraViewController/**/*.xib', 'TGCameraViewController/**/*.xcassets', 'TGCameraViewController/Resources/TGCameraViewController.bundle']
  s.source = { :git => 'https://github.com/tdginternet/TGCameraViewController.git', :tag => s.version }  
end
