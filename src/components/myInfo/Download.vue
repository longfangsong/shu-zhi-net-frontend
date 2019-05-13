<template>
    <v-btn @click="download" class="third fourth--text">下载</v-btn>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";

    const pdfMake = require('pdfmake/build/pdfmake.js');
    const pdfMakeFont = require('@/tools/pdf/vfs_fonts.js');
    pdfMake.vfs = pdfMakeFont.pdfMake.vfs;

    @Component
    export default class Download extends Vue {
        download() {
            pdfMake.fonts = {
                NotoSansHans: {
                    normal: 'NotoSansHans-Regular.1.ttf'
                }
            };
            let pdfData = {
                defaultStyle: {
                    font: 'NotoSansHans'
                },
                content: [
                    {text: '电子档案', style: 'header'},
                    {text: '个人信息', style: 'header2'},
                    {
                        table: {
                            headerRows: 0,
                            widths: ['auto', '*', 'auto', '*', 'auto'],
                            body: [
                                [{text: '学号'}, {text: '00000000'}, {text: '姓名'}, {text: '测试'}, {
                                    rowSpan: 3,
                                    image: require('@/tools/pdf/temp_img.json').img,
                                    width: 120
                                }],
                                [{text: '性别'}, {text: '无'}, {text: '专业'}, {text: 'PPT制作与吹逼'}, {text: ''}],
                                [{text: '学院'}, {text: '计算机PPT与研讨学院'}, {text: '身份证号码'}, {text: '000000000000000000'}, {text: ''}],
                            ]
                        },
                        margin: [0, 0, 0, 10]
                    },
                    {text: '我参加的活动', style: 'header2'},
                    {
                        table: {
                            headerRows: 1, widths: ['*', 'auto', 'auto'], body: [
                                ['活动名称', '主办方', '活动分类'],
                                ['测试', '社区学院', '测试']
                            ]
                        },
                        margin: [0, 0, 0, 10]
                    },
                    {
                        columns: [
                            {width: '*', text: '个人成就', style: 'header2'},
                            {
                                width: '200',
                                image: require('@/tools/pdf/temp_img.json').img2
                            }
                        ],
                        margin: [0, 0, 0, 10]
                    }
                ],
                styles: {
                    header: {
                        fontSize: 24,
                        alignment: 'center'
                    },
                    header2: {
                        fontSize: 18,
                        alignment: 'left'
                    }
                }
            };
            pdfMake.createPdf(pdfData).open();
        }
    }
</script>

<style scoped>

</style>
