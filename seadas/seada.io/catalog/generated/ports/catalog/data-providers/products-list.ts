// This file is generated by Seada.io. Do not edit manually!
// @ts-nocheck

import * as __seada__seada_io_source_catalog_ports_catalog_data_providers_products_list__ from "@seada.io.source/catalog/ports/catalog/data-providers/products-list";
import * as __seada__seada_io_catalog_search_plugins_data_providers_add_products_list__ from "@seada.io/catalog-search/plugins/data-providers/add-products-list";
import { IDataProvider } from "@seada.io/core/spi/components/interface";
import adapterDataProvider from "@seada.io/core/spi/data-providers/adapter-data-provider";
import { IProductsListData } from "@seada.io/catalog/interface/product";
import findComponent from "@seada.io/core/spi/seada-pages/manipulation/find-component";
import catalogPortClass from "@seada.io/catalog/spi/catalog-port-class";

export type { IProductsListDataProviderResult } from "@seada.io.source/catalog/ports/catalog/data-providers/products-list";

export default function dataProvider(component, pageData, variables): any {
    return __seada__seada_io_catalog_search_plugins_data_providers_add_products_list__.default(() => __seada__seada_io_source_catalog_ports_catalog_data_providers_products_list__.default(component, pageData, variables), component, pageData, variables);
}
