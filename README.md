# seada.io

## Table of Contents

-   [What is Seada.io?](#what-is-seadaio)
    -   [Key Features and Purpose](#key-features-and-purpose)
    -   [Use Cases](#use-cases)
-   [Understanding Seada.io](#understanding-seadaio)
    -   [Architecture Breakdown](#architecture-breakdown)
        -   [Pages and Components](#pages-and-components)
        -   [Seada.io router](#seadaio-router)
        -   [Areas](#areas)
        -   [Contexts](#contexts)
        -   [Adapters and Sources](#adapters-and-sources)
        -   [Cache Management](#cache-management)
    -   [Key Features](#key-features)
-   [Prerequisites](#prerequisites)
    -   [Installing Node.js via nvm](#installing-nodejs-via-nvm)
-   [Setup](#setup)
-   [Development](#development)
    -   [Running the Project](#running-the-project)
-   [Running the Project](#running-the-project)
-   [Contributing](#contributing)
-   [License](#license)

## What is Seada.io?

**Seada.io** is an advanced, open-source platform designed to seamlessly manage and deliver content across complex,
multi-faceted web applications. It serves as a powerful middleware that connects various data sources, such as
e-commerce platforms, content management systems (CMS), search engines, and more, with the front-end components of a
website.

### Key Features and Purpose

-   **Dynamic Content Management**: Seada.io allows for the aggregation of content from multiple sources, enabling web
    pages to display diverse and highly customized data based on different contexts. Whether it's pulling in product
    information, customer data, or blog posts, Seada.io ensures that the right content is delivered to the right place.

-   **Multi-Context Handling**: The platform excels in handling multiple contexts simultaneously. For example, a single
    webpage might need to display product details from an e-commerce platform while also showing search results from a
    separate search engine. Seada.io handles these scenarios efficiently, ensuring smooth content integration.

-   **Area-Based Content Distribution**: Seada.io allows for the creation of "areas" within a website. An area could
    represent different sections of the site, such as different languages, regions, or even entirely different content
    strategies. Each area can be configured to pull data from specific sources, providing tailored user experiences.

-   **Extensibility and Customization**: Seada.io is designed to be highly extensible. Developers can easily integrate new
    data sources or customize existing ones through plugins. This flexibility makes it ideal for growing businesses or
    applications that require frequent updates to their content strategy.

-   **Performance Optimization**: Through its multi-layered caching system, Seada.io ensures that content delivery is both
    fast and reliable. By caching frequently accessed data at various levels, it reduces the load on external data sources
    and improves the performance of web applications.

### Use Cases

Seada.io is particularly useful for:

-   **E-Commerce Websites**: Where different areas of the site may need to display content from different storefronts or
    CMS systems, depending on the user's location or language preferences.
-   **Multi-Regional or Multi-Lingual Sites**: That require different content or data sources depending on the region or
    language of the user.
-   **Complex Web Applications**: That aggregate data from multiple APIs, databases, or other external sources and need to
    present this data in a unified, consistent manner across various parts of the site.

## Understanding Seada.io architecture

The seada.io project utilizes a highly modular and extensible architecture, designed to accommodate complex and diverse
requirements. Below is an explanation of the key components and their interactions, as depicted in the provided
architecture diagram.

### Architecture Breakdown

#### Pages and Components:

-   Each web page can contain one or more components. These components are flexible and can reference one or multiple
    contexts to fetch and display the necessary data.

#### Seada.io router:

-   The Seada.io router acts as the core of the system, processing requests from the components on the web pages. It
    dynamically determines which areas and contexts need to be accessed based on the page's URL and the specific
    requirements of the components.

#### Areas:

-   An "Area" represents a subsection of the website. This could be something like `/it` for the Italian version of
    the site or other paths that might represent different languages, regions, or even different data sources.
-   Each area is associated with specific contexts that define what data sources to use and how to display content
    within that section of the site.

#### Contexts:

-   Contexts are central to how Seada.io organizes and manages content. Each context (e.g., Cart, Catalog, Content,
    Search, Customer) corresponds to a different type of data or functionality.
-   Contexts are highly modular, meaning you can have multiple contexts of the same type (e.g., multiple Catalog
    contexts) within different areas. This allows for a high degree of customization depending on the area of the site
    being accessed.

#### Adapters and Sources:

-   Adapters (Ports) serve as connectors between contexts and their data sources. Each context is linked to one or
    more adapters, which in turn communicate with external data sources (e.g., BigCommerce, Algolia, Wordpress).
-   Sources can be any data service, and they are fully extendable via plugins. This means you can integrate new data
    sources as needed, or customize existing ones to better fit the requirements of your specific contexts.

#### Cache Management:

-   To optimize performance, Seada.io uses a multi-layered cache management system. The `Cache manager` handles
    various levels of caching (L1, L2, etc.), ensuring that the most frequently accessed data is readily available,
    reducing the load on both the engine and external sources.

### Key Features

-   **Modularity**: The architecture allows for a high degree of modularity, where new contexts, areas, and sources can be
    added or modified with minimal disruption to the overall system.
-   **Scalability**: The system is designed to handle multiple areas and contexts, making it suitable for complex websites
    with varied content requirements.
-   **Extensibility**: Sources can be integrated via plugins, allowing the system to evolve and adapt as new data needs
    arise.

This architecture provides a robust foundation for building dynamic, context-driven websites, with the flexibility to
manage content across different areas and sources seamlessly.

## Prerequisites

Before you begin, ensure you have met the following requirements:

-   **Node.js v20.x.x**: seada.io requires Node.js version 20. We recommend using `nvm` (Node Version Manager) to manage
    your Node.js versions.
-   **npm**: Node Package Manager, which comes bundled with Node.js.

### Installing Node.js via nvm

If you haven't installed `nvm` yet, follow these steps:

1. **Install nvm**:

    - On macOS and Linux, you can install `nvm` by running the following command in your terminal:
        ```bash
        curl -o - https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash
        ```
    - On Windows, consider using [nvm-windows](https://github.com/coreybutler/nvm-windows).

2. **Install and set Node.js 20**:
    ```bash
    nvm install 20
    nvm use 20
    ```

## Setup

Follow these steps to set up the seada.io project on your local machine:

1. Clone the repository:

    ```bash
    git clone https://github.com/phoenix128/seada.git
    ```

2. Navigate to the project directory and install the dependencies:
    ```bash
    cd seada
    npm i
    ```
3. Create a `.env` file in `apps/web` and add the following environment variables according to your preferences:

    ```bash
    AUTHORIZED_BUILDER=http://localhost:3001/
    BASE_URL=http://localhost:3000/
    SEADA_FILES_URL=http://localhost:3000/seada
    BUILDER_FILES_URL=http://localhost:3001/seada
    CONTROL_SHARED_SECRET=mystrongsecret
    JWT_SECRET=anotherstrongsecret
    CACHE__ADAPTERS=memory
    ```

    Make sure to use complex and secure values for the `CONTROL_SHARED_SECRET` and `JWT_SECRET` environment variables.

4. Create a `.env` file in `apps/builder` and add the following environment variables according to your preferences:

    ```bash
    PORT=3001
    BUILDER_TARGET=http://localhost:3000
    CONTROL_SHARED_SECRET=mystrongsecret
    STORAGE__OBJECTS__ADAPTER=filesystem
    STORAGE__OBJECTS__PATH=seada-files
    STORAGE__IMAGES__ADAPTER=filesystem
    STORAGE__IMAGES__PATH=public/images
    STORAGE__IMAGES__URL=http://localhost:3001/images
    UPLOAD_PATH=uploads
    ```

    Make sure to use the same value for the `CONTROL_SHARED_SECRET` you defined in the `.env` file in the `apps/web`.

5. Configure your backends (sources):

    ```bash
    cd seadas/seada.io/core
    npm run source:setup
    ```

    Here you should define each source you want to use in your project (BigCommerce, Algolia, Wordpress, etc.). Later on,
    you can assign these sources to your contexts.

    Your `.env` file will be updated with all the new information.

6. Configure your areas:

    ```bash
    cd seadas/seada.io/core
    npm run area:setup
    ```

    Most of the setup will require one single area with `/` as base path, but you can define as many areas as you need (
    e.g., `/`, `/fr`, `/de`, etc.).
    For each area you will define, you will need to assign the sources you want to use.

    Your `.env` file will be updated with all the new information.

7. Move to the project root directory and run the following command:

    ```bash
    cd seadas/seada.io/core
    npm run dev
    ```

8. Open your browser and navigate to `http://localhost:3000/` to see the project running and `http://localhost:3001/` to
   access the page builder.
