// This file is generated by Seada.io. Do not edit manually!
// @ts-nocheck

import * as __seada__seada_io_source_core_service_get_root_contexts__ from "@seada.io.source/core/service/get-root-contexts";
import * as __seada__seada_io_cart_contexts_cartcontext_cartcontext__ from "@seada.io/cart/contexts/CartContext/CartContext";
import React from "react";

export default function getRootContexts(contexts?: React.FC[]): React.FC[] {
    const __seada__contexts = contexts ?? [__seada__seada_io_cart_contexts_cartcontext_cartcontext__.CartContextProvider];
    return __seada__seada_io_source_core_service_get_root_contexts__.default(__seada__contexts);
}
