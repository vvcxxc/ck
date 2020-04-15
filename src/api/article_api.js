import article_http from "./article_http"

/**
 * 精品文章推荐
 */
export const getQualityArticle = params => article_http({
  url: 'api/qualityArticle',
  methods: 'get',
  params
})


