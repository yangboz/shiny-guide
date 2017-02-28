package info.smartkit.shiny.guide.controllers;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.ws.rs.core.MediaType;

import com.blogspot.na5cent.exom.ExOM;
import info.smartkit.shiny.guide.dao.ItemDetailDao;
import info.smartkit.shiny.guide.dao.ItemInfoDao;
import info.smartkit.shiny.guide.settings.UploadSettings;
import info.smartkit.shiny.guide.utils.MahoutUtils;
import info.smartkit.shiny.guide.vo.ItemDetail;
import info.smartkit.shiny.guide.vo.ItemInfo;
import io.swagger.annotations.ApiOperation;
import org.apache.commons.io.FilenameUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.mahout.cf.taste.common.TasteException;
import org.apache.mahout.cf.taste.impl.model.file.FileDataModel;
import org.apache.mahout.cf.taste.model.DataModel;
import org.apache.mahout.cf.taste.recommender.RecommendedItem;
import org.hibernate.validator.constraints.NotBlank;
import org.im4java.core.ConvertCmd;
import org.im4java.core.IM4JavaException;
import org.im4java.core.IMOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import info.smartkit.shiny.guide.dto.JsonObject;
import info.smartkit.shiny.guide.utils.FileUtil;

/**
 * The Class UploadController.
 */
@RestController
// @see: http://spring.io/guides/gs/reactor-thumbnailer/
@RequestMapping(value = "/upload")
public class UploadController {
    //
    private static Logger LOG = LogManager.getLogger(UploadController.class);

    @Autowired
    private ItemDetailDao itemDetailDao;
    @Autowired
    private ItemInfoDao itemInfoDao;

    @Autowired
    private UploadSettings uploadSettings;

    //@SEE:http://www.ibm.com/developerworks/cn/java/j-lo-mahout/index.html
    // @see: https://spring.io/guides/gs/uploading-files/
    @RequestMapping(method = RequestMethod.POST, value = "/recommend", consumes = MediaType.MULTIPART_FORM_DATA)
    @ApiOperation(value = "Response a list of recommend  of TD' picture is successfully uploaded or not.")
//	@ApiImplicitParams({@ApiImplicitParam(name="Authorization", value="Authorization DESCRIPTION")})
    public
    @ResponseBody
    List<RecommendedItem> TDFileUpload(
            // @RequestParam(value = "name", required = false, defaultValue =
            // "default_input_image_file_name") String name,
            // @RequestParam(value = "owner", required = false, defaultValue =
            // "default_intellif_corp") String owner,
            @RequestPart(value = "file") @Valid @NotNull @NotBlank MultipartFile file) throws IOException, TasteException {
        // @Validated MultipartFileWrapper file, BindingResult result, Principal
        // principal){

        String fileName = null;
        List<RecommendedItem> recommendations = null;
        if (!file.isEmpty()) {
            Map<String, String> _imageMagickOutput = this.fileOperation(file, "tmahout");
            // Image resize operation.
            fileName = uploadSettings.getTmahout() + _imageMagickOutput.get(ImageSize.ori.toString());
            //Creating data model
            DataModel datamodel = new FileDataModel(new File(fileName)); //data
            long startTime = System.currentTimeMillis();
            MahoutUtils.userCF(datamodel);
            long stopTime = System.currentTimeMillis();
            System.out.println("Mahout Took: " + (stopTime - startTime) + " millis");
        } else {
            LOG.error("You failed to upload " + file.getName() + " because the file was empty.");
        }
        return recommendations;
    }

    // @see: https://spring.io/guides/gs/uploading-files/
    @RequestMapping(method = RequestMethod.POST, value = "/tcsv", consumes = MediaType.MULTIPART_FORM_DATA)
    @ApiOperation(value = "Response a list of recommend  of TD' picture is successfully uploaded or not.")
//	@ApiImplicitParams({@ApiImplicitParam(name="Authorization", value="Authorization DESCRIPTION")})
    public
    @ResponseBody
    JsonObject TCsvFileUpload(
            // @RequestParam(value = "name", required = false, defaultValue =
            // "default_input_image_file_name") String name,
            // @RequestParam(value = "owner", required = false, defaultValue =
            // "default_intellif_corp") String owner,
            @RequestPart(value = "file") @Valid @NotNull @NotBlank MultipartFile file) throws Throwable {
        // @Validated MultipartFileWrapper file, BindingResult result, Principal
        // principal){
        long startTime = System.currentTimeMillis();
        long lastID = -1;
        String fileName = null;
        ItemDetail savedItem = null;
        if (!file.isEmpty()) {
            Map<String, String> _imageMagickOutput = this.fileOperation(file, "tcsv");
            // Image resize operation.
            fileName = FileUtil.getUploads("tcsv") + _imageMagickOutput.get(ImageSize.ori.toString());
            List<ItemDetail> items = ExOM.mapFromExcel(new File(fileName))
                    .toObjectOf(ItemDetail.class)
                    .map();
//            for (ItemDetail item : items) {
//                //Save to database return last id;
//                lastID = itemDetailDao.save(item).getId();
//                LOG.info("Saved ItemDetail.id--> {}", lastID);
//            }
            ItemDetail lastItem = items.get(items.size() - 1);
            LOG.info("Mapped last ItemDetail-->" + lastItem.toString());
            //Save to database return last id;
            savedItem = itemDetailDao.save(lastItem);
            LOG.info("Saved ItemDetail--> " + savedItem);
        } else {
            LOG.error("You failed to upload " + file.getName() + " because the file was empty.");
        }
        return new JsonObject(savedItem);
    }

    // @see: https://spring.io/guides/gs/uploading-files/
    @RequestMapping(method = RequestMethod.POST, value = "/timage", consumes = MediaType.MULTIPART_FORM_DATA)
    @ApiOperation(value = "Response a string describing Tongue' picture is successfully uploaded or not.")
//	@ApiImplicitParams({@ApiImplicitParam(name="Authorization", value="Authorization DESCRIPTION")})
    public
    @ResponseBody
    JsonObject TImageFileUpload(
            // @RequestParam(value = "name", required = false, defaultValue =
            // "default_input_image_file_name") String name,
            // @RequestParam(value = "owner", required = false, defaultValue =
            // "default_intellif_corp") String owner,
            @RequestPart(value = "file") @Valid @NotNull @NotBlank MultipartFile file) {
        // @Validated MultipartFileWrapper file, BindingResult result, Principal
        // principal){
        ItemInfo saved = null;
        String fileName = null;
        if (!file.isEmpty()) {
            // ImageMagick convert options; @see:
            // http://paxcel.net/blog/java-thumbnail-generator-imagescalar-vs-imagemagic/
            Map<String, String> _imageMagickOutput = this.fileOperation(file, "timage");
            // Save to database.
            try {
                // Image resize operation.
                fileName = _imageMagickOutput.get(ImageSize.ori.toString());
                LOG.info("ImageMagick output success: " + fileName);
                String imageUrl = uploadSettings.getTimage() + fileName;
                //Save to database as an item info
                ItemInfo itemInfo = new ItemInfo(fileName, imageUrl, -1);
                saved = itemInfoDao.save(itemInfo);
                LOG.info("Saved ItemInfo--> " + saved.toString());
            } catch (Exception ex) {
                LOG.error(ex.toString());
            }
        } else {
            LOG.error("You failed to upload " + file.getName() + " because the file was empty.");
        }
        return new JsonObject(saved);
    }

    //
    @SuppressWarnings("unused")
    private String thumbnailImage(int width, int height, String source)
            throws IOException, InterruptedException, IM4JavaException {
        //
        String small4dbBase = FilenameUtils.getBaseName(source) + "_" + String.valueOf(width) + "x"
                + String.valueOf(height) + "." + FilenameUtils.getExtension(source);
        String small4db = FileUtil.getUploads("timage") + small4dbBase;
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

    private Map<String, String> fileOperation(MultipartFile file, String context) {
        Map<String, String> _imageMagickOutput = new HashMap<String, String>();
        String dbFileName = null;
        String fullFileName = null;
        try {
            byte[] bytes = file.getBytes();
            String fileExt = FilenameUtils.getExtension(file.getOriginalFilename());
            String fileNameAppendix
                    // = "temp" + "." + fileExt;
                    = new SimpleDateFormat("yyyy-MM-dd-HH-mm-ss-SSS").format(new Date()) + "." + fileExt;

            dbFileName = FileUtil.getUploads(context) + fileNameAppendix;
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

    // @Autowired
    // private FolderSetting folderSetting;

    public String getClassPath() {
        String classPath = this.getClass().getResource("/").getPath();
        return classPath;
    }

    // Enum for image size.
    enum ImageSize {
        ori, sml, ico
    }
}