package info.smartkit.shiny.guide.settings;

/**
 * The Class ServerSetting.
 */
public class ServerSetting {
	private static Integer port;

	public static Integer getPort() {
		return port;
	}

	public static void setPort(Integer port) {
		ServerSetting.port = port;
	}

	private static String contextPath;

	public static String getContextPath() {
		return contextPath;
	}

	public static void setContextPath(String contextPath) {
		ServerSetting.contextPath = contextPath;
	}
}
