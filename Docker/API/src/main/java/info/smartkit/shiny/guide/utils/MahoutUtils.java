package info.smartkit.shiny.guide.utils;

import org.apache.mahout.cf.taste.common.TasteException;
import org.apache.mahout.cf.taste.eval.RecommenderBuilder;
import org.apache.mahout.cf.taste.impl.common.LongPrimitiveIterator;
import org.apache.mahout.cf.taste.impl.recommender.svd.ALSWRFactorizer;
import org.apache.mahout.cf.taste.model.DataModel;
import org.apache.mahout.cf.taste.neighborhood.UserNeighborhood;
import org.apache.mahout.cf.taste.similarity.ItemSimilarity;
import org.apache.mahout.cf.taste.similarity.UserSimilarity;

import java.util.List;

/**
 * Created by yangboz on 23/02/2017.
 *
 * @see http://blog.fens.me/mahout-recommendation-api/
 */
public class MahoutUtils {

    final static int NEIGHBORHOOD_NUM = 2;
    final static int RECOMMENDER_NUM = 3;

    public static void userCF(DataModel dataModel) throws TasteException {
        UserSimilarity userSimilarity = RecommendFactory.userSimilarity(RecommendFactory.SIMILARITY.EUCLIDEAN, dataModel);
        UserNeighborhood userNeighborhood = RecommendFactory.userNeighborhood(RecommendFactory.NEIGHBORHOOD.NEAREST, userSimilarity, dataModel, NEIGHBORHOOD_NUM);
        RecommenderBuilder recommenderBuilder = RecommendFactory.userRecommender(userSimilarity, userNeighborhood, true);

        RecommendFactory.evaluate(RecommendFactory.EVALUATOR.AVERAGE_ABSOLUTE_DIFFERENCE, recommenderBuilder, null, dataModel, 0.7);
        RecommendFactory.statsEvaluator(recommenderBuilder, null, dataModel, 2);

        LongPrimitiveIterator iter = dataModel.getUserIDs();
        while (iter.hasNext()) {
            long uid = iter.nextLong();
            List list = recommenderBuilder.buildRecommender(dataModel).recommend(uid, RECOMMENDER_NUM);
            RecommendFactory.showItems(uid, list, true);
        }
    }

    public static void itemCF(DataModel dataModel) throws TasteException {
        ItemSimilarity itemSimilarity = RecommendFactory.itemSimilarity(RecommendFactory.SIMILARITY.EUCLIDEAN, dataModel);
        RecommenderBuilder recommenderBuilder = RecommendFactory.itemRecommender(itemSimilarity, true);

        RecommendFactory.evaluate(RecommendFactory.EVALUATOR.AVERAGE_ABSOLUTE_DIFFERENCE, recommenderBuilder, null, dataModel, 0.7);
        RecommendFactory.statsEvaluator(recommenderBuilder, null, dataModel, 2);

        LongPrimitiveIterator iter = dataModel.getUserIDs();
        while (iter.hasNext()) {
            long uid = iter.nextLong();
            List list = recommenderBuilder.buildRecommender(dataModel).recommend(uid, RECOMMENDER_NUM);
            RecommendFactory.showItems(uid, list, true);
        }
    }

//    public static void slopeOne(DataModel dataModel) throws TasteException {
//        RecommenderBuilder recommenderBuilder = RecommendFactory.slopeOneRecommender();
//
//        RecommendFactory.evaluate(RecommendFactory.EVALUATOR.AVERAGE_ABSOLUTE_DIFFERENCE, recommenderBuilder, null, dataModel, 0.7);
//        RecommendFactory.statsEvaluator(recommenderBuilder, null, dataModel, 2);
//
//        LongPrimitiveIterator iter = dataModel.getUserIDs();
//        while (iter.hasNext()) {
//            long uid = iter.nextLong();
//            List list = recommenderBuilder.buildRecommender(dataModel).recommend(uid, RECOMMENDER_NUM);
//            RecommendFactory.showItems(uid, list, true);
//        }
//    }

//    public static void itemKNN(DataModel dataModel) throws TasteException {
//        ItemSimilarity itemSimilarity = RecommendFactory.itemSimilarity(RecommendFactory.SIMILARITY.EUCLIDEAN, dataModel);
//        RecommenderBuilder recommenderBuilder = RecommendFactory.itemKNNRecommender(itemSimilarity, new NonNegativeQuadraticOptimizer(), 10);
//
//        RecommendFactory.evaluate(RecommendFactory.EVALUATOR.AVERAGE_ABSOLUTE_DIFFERENCE, recommenderBuilder, null, dataModel, 0.7);
//        RecommendFactory.statsEvaluator(recommenderBuilder, null, dataModel, 2);
//
//        LongPrimitiveIterator iter = dataModel.getUserIDs();
//        while (iter.hasNext()) {
//            long uid = iter.nextLong();
//            List list = recommenderBuilder.buildRecommender(dataModel).recommend(uid, RECOMMENDER_NUM);
//            RecommendFactory.showItems(uid, list, true);
//        }
//    }

    public static void svd(DataModel dataModel) throws TasteException {
        RecommenderBuilder recommenderBuilder = RecommendFactory.svdRecommender(new ALSWRFactorizer(dataModel, 10, 0.05, 10));

        RecommendFactory.evaluate(RecommendFactory.EVALUATOR.AVERAGE_ABSOLUTE_DIFFERENCE, recommenderBuilder, null, dataModel, 0.7);
        RecommendFactory.statsEvaluator(recommenderBuilder, null, dataModel, 2);

        LongPrimitiveIterator iter = dataModel.getUserIDs();
        while (iter.hasNext()) {
            long uid = iter.nextLong();
            List list = recommenderBuilder.buildRecommender(dataModel).recommend(uid, RECOMMENDER_NUM);
            RecommendFactory.showItems(uid, list, true);
        }
    }

//    public static void treeCluster(DataModel dataModel) throws TasteException {
//        UserSimilarity userSimilarity = RecommendFactory.userSimilarity(RecommendFactory.SIMILARITY.LOGLIKELIHOOD, dataModel);
//        ClusterSimilarity clusterSimilarity = RecommendFactory.clusterSimilarity(RecommendFactory.SIMILARITY.FARTHEST_NEIGHBOR_CLUSTER, userSimilarity);
//        RecommenderBuilder recommenderBuilder = RecommendFactory.treeClusterRecommender(clusterSimilarity, 10);
//
//        RecommendFactory.evaluate(RecommendFactory.EVALUATOR.AVERAGE_ABSOLUTE_DIFFERENCE, recommenderBuilder, null, dataModel, 0.7);
//        RecommendFactory.statsEvaluator(recommenderBuilder, null, dataModel, 2);
//
//        LongPrimitiveIterator iter = dataModel.getUserIDs();
//        while (iter.hasNext()) {
//            long uid = iter.nextLong();
//            List list = recommenderBuilder.buildRecommender(dataModel).recommend(uid, RECOMMENDER_NUM);
//            RecommendFactory.showItems(uid, list, true);
//        }
//    }
}
