package info.smartkit.shiny.guide.controllers;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.ws.rs.core.MediaType;

import io.swagger.annotations.ApiOperation;
import org.apache.commons.io.FilenameUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.hibernate.validator.constraints.NotBlank;
import org.im4java.core.ConvertCmd;
import org.im4java.core.IM4JavaException;
import org.im4java.core.IMOperation;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import info.smartkit.shiny.guide.dto.JsonObject;
import info.smartkit.shiny.guide.dto.OcrInfo;
import info.smartkit.shiny.guide.utils.FileUtil;
import info.smartkit.shiny.guide.utils.OcrInfoHelper;
import net.sourceforge.tess4j.Tesseract;
import net.sourceforge.tess4j.TesseractException;

/**
 * The Class OCRsController.
 */
@RestController
// @see: http://spring.io/guides/gs/reactor-thumbnailer/
@RequestMapping(value = "/shiny.guide")
public class OCRsController {
	//
	private static Logger LOG = LogManager.getLogger(OCRsController.class);

	// Enum for image size.
	enum ImageSize {
		ori, sml, ico
	}

	// @see: https://spring.io/guides/gs/uploading-files/
	@RequestMapping(method = RequestMethod.POST, value = "/TD/recommend", consumes = MediaType.MULTIPART_FORM_DATA)
	@ApiOperation(value = "Response a list of recommend  of TD' picture is successfully uploaded or not.")
//	@ApiImplicitParams({@ApiImplicitParam(name="Authorization", value="Authorization DESCRIPTION")})
	public @ResponseBody JsonObject TDFileUpload(
			// @RequestParam(value = "name", required = false, defaultValue =
			// "default_input_image_file_name") String name,
			// @RequestParam(value = "owner", required = false, defaultValue =
			// "default_intellif_corp") String owner,
			@RequestPart(value = "file") @Valid @NotNull @NotBlank MultipartFile file) {
		// @Validated MultipartFileWrapper file, BindingResult result, Principal
		// principal){
		long startTime = System.currentTimeMillis();
		OcrInfo ocrInfo = new OcrInfo();
		String fileName = null;
		if (!file.isEmpty()) {
			//Creating data model
			DataModel datamodel = new FileDataModel(new File("data")); //data

			//Creating UserSimilarity object.
			UserSimilarity usersimilarity = new PearsonCorrelationSimilarity(datamodel);

			//Creating UserNeighbourHHood object.
			UserNeighborhood userneighborhood = new ThresholdUserNeighborhood(3.0, usersimilarity, datamodel);

			//Create UserRecomender
			UserBasedRecommender recommender = new GenericUserBasedRecommender(datamodel, userneighborhood, usersimilarity);

			List<RecommendedItem> recommendations = recommender.recommend(2, 3);

			for (RecommendedItem recommendation : recommendations) {
				System.out.println(recommendation);
			}
				}
			} catch (Exception ex) {
				LOG.error(ex.toString());
			}
		} else {
			LOG.error("You failed to upload " + file.getName() + " because the file was empty.");
		}
		return new JsonObject(ocrInfo);
	}



	// @see: https://spring.io/guides/gs/uploading-files/
	@RequestMapping(method = RequestMethod.POST, value = "/tesseract", consumes = MediaType.MULTIPART_FORM_DATA)
	@ApiOperation(value = "Response a string describing OCR' picture is successfully uploaded or not.")
//	@ApiImplicitParams({@ApiImplicitParam(name="Authorization", value="Authorization DESCRIPTION")})
	public @ResponseBody JsonObject TesseractFileUpload(
			// @RequestParam(value = "name", required = false, defaultValue =
			// "default_input_image_file_name") String name,
			// @RequestParam(value = "owner", required = false, defaultValue =
			// "default_intellif_corp") String owner,
			@RequestPart(value = "file") @Valid @NotNull @NotBlank MultipartFile file) {
		// @Validated MultipartFileWrapper file, BindingResult result, Principal
		// principal){
		long startTime = System.currentTimeMillis();
		OcrInfo ocrInfo = new OcrInfo();
		String fileName = null;
		if (!file.isEmpty()) {
			// ImageMagick convert options; @see:
			// http://paxcel.net/blog/java-thumbnail-generator-imagescalar-vs-imagemagic/
			Map<String, String> _imageMagickOutput = this.fileOperation(file);
			// Save to database.
			try {
				// Image resize operation.
				fileName = _imageMagickOutput.get(ImageSize.ori.toString());
				LOG.info("ImageMagick output success: " + fileName);
				 String imageUrl = OcrInfoHelper.getRemoteImageUrl(fileName);
				ocrInfo.setUri(imageUrl);
				// OCRing:
		        try {
		            Tesseract tesseract = Tesseract.getInstance(); // JNA Interface Mapping
		            String fullFilePath = FileUtil.getUploads()+fileName;
		            LOG.info("OCR full file path: "+fullFilePath);
		            //setTessVariable
		            //key - variable name, e.g., tessedit_create_hocr, tessedit_char_whitelist, etc.
		            //value - value for corresponding variable, e.g., "1", "0", "0123456789", etc.
		            tesseract.setTessVariable("tessedit_char_whitelist", "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789");
		            String imageText = tesseract.doOCR(new File(fullFilePath));
		            LOG.debug("SMARKIT.INFO OCR Result = " + imageText);
		            ocrInfo.setText(imageText);
		            //Timing calculate
		    		long endTime = System.currentTimeMillis();
		    		ocrInfo.setTime(endTime - startTime);//"That took " + (endTime - startTime) + " milliseconds"
		        } catch (Exception e) {
		            LOG.warn("TessearctException while converting the uploaded image: "+ e);
		            throw new TesseractException();
		        }
			} catch (Exception ex) {
				LOG.error(ex.toString());
			}
		} else {
			LOG.error("You failed to upload " + file.getName() + " because the file was empty.");
		}
		return new JsonObject(ocrInfo);
	}

	//
	@SuppressWarnings("unused")
	private String thumbnailImage(int width, int height, String source)
			throws IOException, InterruptedException, IM4JavaException {
		//
		String small4dbBase = FilenameUtils.getBaseName(source) + "_" + String.valueOf(width) + "x"
				+ String.valueOf(height) + "." + FilenameUtils.getExtension(source);
		String small4db = FileUtil.getUploads() + small4dbBase;
		String small = getClassPath() + small4db;
		// @see:
		// http://paxcel.net/blog/java-thumbnail-generator-imagescalar-vs-imagemagic/
		ConvertCmd cmd = new ConvertCmd();
		// cmd.setSearchPath("");
		File thumbnailFile = new File(small);
		if (!thumbnailFile.exists()) {
			IMOperation op = new IMOperation();
			op.addImage(source);
			op.thumbnail(width);
			op.addImage(small);
			cmd.run(op);
			LOG.info("ImageMagick success result:" + small);
		}
		return small4dbBase;
	}

	// @Autowired
	// private FolderSetting folderSetting;

	private Map<String, String> fileOperation(MultipartFile file) {
		Map<String, String> _imageMagickOutput = new HashMap<String, String>();
		String dbFileName = null;
		String fullFileName = null;
		try {
			byte[] bytes = file.getBytes();
			String fileExt = FilenameUtils.getExtension(file.getOriginalFilename());
			String fileNameAppendix
			// = "temp" + "." + fileExt;
			= new SimpleDateFormat("yyyy-MM-dd-HH-mm-ss-SSS").format(new Date()) + "." + fileExt;

			dbFileName = FileUtil.getUploads() + fileNameAppendix;
			fullFileName = dbFileName;

			BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(new File(fullFileName)));
			stream.write(bytes);
			stream.close();
			// System.out.println("Upload file success." + fullFileName);
			LOG.info("Upload file success." + fullFileName);
			// ImageMagick convert options; @see:
			// http://paxcel.net/blog/java-thumbnail-generator-imagescalar-vs-imagemagic/
			_imageMagickOutput.put(ImageSize.ori.toString(), fileNameAppendix);
			// _imageMagickOutput.put(ImageSize.sml.toString(),
			// thumbnailImage(150, 150, fullFileName));
			// _imageMagickOutput.put(ImageSize.ico.toString(),
			// thumbnailImage(32, 32, fullFileName));
			return _imageMagickOutput;
		} catch (Exception e) {
			// System.out.println("You failed to convert " + fullFileName + " =>
			// " + e.toString());
			LOG.error("You failed to convert " + fullFileName + " => " + e.toString());
		}
		return _imageMagickOutput;
	}

	public String getClassPath() {
		String classPath = this.getClass().getResource("/").getPath();
		return classPath;
	}
}
