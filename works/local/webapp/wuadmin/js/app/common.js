// 关键词使用require或者requirejs都可以，注意引用的时候不要带文件后缀.js
require.config({
    baseUrl: '../js/',
    paths: {
        jquery: 'libs/jquery/jquery-1.11.1.min',
        editor: 'libs/wangeditor/wangEditor',
        layer: 'libs/layer/layer',
        selectbox: 'libs/jquery.selectbox/jquery.selectbox',
        webuploader: 'libs/webuploader/webuploader',
        jqvalidate: 'libs/jquery.validate/jquery.validate',
        pieceConfig: 'components/piece-config',
        pieceTree: 'components/piece-tree',
        pieceTopNav: 'components/piece-top-nav',
        pieceTabBar: 'components/piece-tab-bar',
        pieceEditor: 'components/piece-editor',
        pieceUploader: 'components/piece-uploader',
        pieceValidate: 'components/piece-form-validate',
        pieceLayer: 'components/piece-layer',
        pieceFormeEles: 'components/piece-form-elements',
        pieceTable: 'components/piece-table',
        pieceDelBtn: 'components/piece-delbtn',
        piecePublic: 'components/piece-public',
        pieceParticles: 'components/piece-particles'
    }
});

