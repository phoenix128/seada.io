import { ITranslationResourceProvider } from '@seada.io/core/interface';
import { Resource } from 'i18next/typescript/options';

const getI18n: ITranslationResourceProvider = (): Resource => {
    return {
        en: {
            translation: {
                schema: {
                    basicUi: {
                        structure: {
                            groupTitle: 'Structure',
                        },
                        search: {
                            groupTitle: 'Search',
                        },
                        pageContent: {
                            componentTitle: 'Page Content',
                            componentDescription: 'The main content of the page',
                        },
                        slider: {
                            componentTitle: 'Slider',
                            componentDescription: 'Slider component with slides, navigation, and pagination',
                            content: {
                                groupTitle: 'Content',
                                slides: 'Slides',
                            },
                            appearance: {
                                groupTitle: 'Appearance',
                                slidesPerView: 'Slides Per View',
                                spaceBetween: 'Space Between',
                                navigation: 'Navigation',
                                pagination: 'Pagination',
                                centeredSlides: 'Centered Slides',
                            },
                            play: {
                                groupTitle: 'Play',
                                autoplay: 'Autoplay',
                                autoplayDelay: 'Autoplay Delay',
                                pauseOnMouseEnter: 'Pause On Mouse Enter',
                            },
                        },
                        page: {
                            groupTitle: 'Page',
                        },
                        layout: {
                            groupTitle: 'Layout',
                        },
                        columnsLayout: {
                            componentTitle: 'Columns Layout',
                            componentDescription: 'Columns layout component',
                        },
                        gridLayout: {
                            componentTitle: 'Grid Layout',
                        },
                        simpleNav: {
                            componentTitle: 'Simple Navigation',
                            componentDescription: 'Simple navigation component with menu items',
                            appearance: {
                                groupTitle: 'Menu',
                                justify: 'Justify',
                                mobileMenu: 'Mobile Mode',
                            },
                        },
                        link: {
                            content: {
                                link: 'Link',
                            },
                        },
                        image: {
                            componentTitle: 'Image',
                            componentDescription: 'Image component with image URL and alt text',
                            image: {
                                groupTitle: 'Image',
                                image: 'Image',
                                title: 'Title',
                                sourceWidth: 'Source Width',
                                sourceHeight: 'Source Height',
                            },
                        },
                        text: {
                            componentTitle: 'Text',
                            componentDescription: 'Text component with text and HTML option',
                            content: {
                                groupTitle: 'Content',
                                text: 'Text',
                                hasHtml: 'Is HTML',
                            },
                            appearance: {
                                groupTitle: 'Text Appearance',
                                size: 'Font size',
                                align: 'Text align',
                                color: 'Font color',
                                spacing: 'Letter spacing',
                                leading: 'Line height',
                                weight: 'Font weight',
                                style: 'Font style',
                                decoration: 'Decoration',
                                decorationColor: 'Decoration color',
                            },
                        },
                        pagination: {
                            title: 'Pagination',
                            componentDescription: 'Pagination component with page count and current page',
                            appearance: {
                                groupTitle: 'Appearance',
                                align: 'Align',
                                showControls: 'Show Controls',
                                siblings: 'Siblings Count',
                            },
                        },
                        header: {
                            componentTitle: 'Page Title',
                            componentDescription: 'Page title component with text and link',
                        },
                        banner: {
                            componentTitle: 'Banner',
                            componentDescription: 'Banner component with image, title, subtitle, and button',
                            content: {
                                groupTitle: 'Content',
                                title: 'Title',
                                subtitle: 'Subtitle',
                                buttonLabel: 'Button Label',
                                buttonLink: 'Button Link',
                            },
                            display: {
                                groupTitle: 'Display',
                                textAlign: 'Text Align',
                                verticalAlign: 'Vertical Align',
                                titleColor: 'Title Color',
                                subtitleColor: 'Subtitle Color',
                                buttonColor: 'Button Color',
                            },
                        },
                        box: {
                            componentTitle: 'Box',
                            componentDescription: 'Basic box components with geometry, background, and borders',
                            visibility: {
                                groupTitle: 'Visibility',
                                visibility: 'Visibility',
                            },
                            geometry: {
                                groupTitle: 'Geometry',
                                size: 'Size',
                                margin: 'Margin',
                                padding: 'Padding',
                                maxSize: 'Max Size',
                                minSize: 'Min Size',
                                aspectRatio: 'Aspect Ratio',
                            },
                            background: {
                                groupTitle: 'Background',
                                backgroundColor: 'Background Color',
                                backgroundOpacity: 'Background Opacity',
                                backgroundImage: 'Background Image',
                                overlayColor: 'Overlay Color',
                                overlayOpacity: 'Overlay Opacity',
                            },
                            borders: {
                                groupTitle: 'Borders',
                                borderWidth: 'Border Width',
                                borderRadius: 'Border Radius',
                                borderColor: 'Border Color',
                                borderStyle: 'Border Style',
                            },
                            flex: {
                                groupTitle: 'Flex Cell',
                                basis: 'Basis',
                                flexGrow: 'Grow',
                                flexShrink: 'Shrink',
                            },
                        },
                        grid: {
                            componentTitle: 'Grid Layout',
                            componentDescription: 'Grid layout component with columns and rows',
                            layout: {
                                groupTitle: 'Layout',
                                columns: 'Columns',
                                gap: 'Gap',
                                innerBordersX: 'Inner Borders X',
                                innerBordersY: 'Inner Borders Y',
                            },
                        },
                        flexLayout: {
                            componentTitle: 'Flex Layout',
                            componentDescription: 'Flex layout component with flex direction, align, justify, and gap',
                            groupTitle: 'Flex Layout',
                            flexDirection: 'Flex Direction',
                            flexAlign: 'Flex Align',
                            flexJustify: 'Flex Justify',
                            gap: 'Gap',
                        },
                    },
                },
            },
        },
    };
};

export default getI18n;
