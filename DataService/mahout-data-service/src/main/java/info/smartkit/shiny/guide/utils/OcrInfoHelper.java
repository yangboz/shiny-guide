package info.smartkit.shiny.guide.utils;

import java.util.regex.Pattern;

import info.smartkit.shiny.guide.settings.ServerSetting;


/**
 * The Class ImageInfoHelper.
 */
public class OcrInfoHelper {
	
	public static String getRemoteFaceUrl(String remoteImageUrl) {
		String fileName = remoteImageUrl.split(getUrlPrefix() )[1];
		String faceUrl = getUrlPrefix() + fileName.split(Pattern.quote("."))[0]+"_f."+fileName.split(Pattern.quote("."))[1];
		return faceUrl;
	}

	public static String getRemoteImageUrl(String fileName) {
		return getUrlPrefix() + fileName;
	}
	
	private static String getUrlPrefix()
	{
		return "http://" + ServerUtil.getInetAddress().getHostAddress() + ":" + ServerSetting.getPort()
		+ ServerSetting.getContextPath() + "/uploads/";
	}
}
