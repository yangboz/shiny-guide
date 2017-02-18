package info.smartkit.shiny.guide.utils;

public class FileUtil {

	public static String getWorkingDir() {
		String workingDir = System.getProperty("user.dir");
		return workingDir;
	}

	public static String getUploads() {
		// if(!new File("/uploads/").exists()) new File("/uploads/").mkdirs();
		// return "/uploads/";
		return getWorkingDir() + "/target/classes/uploads/";
	}
	
}
