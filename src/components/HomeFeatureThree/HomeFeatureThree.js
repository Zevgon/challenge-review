import React from "react";
import "./home-feature-three.sass";
import FeaturedProductInfo from "../FeaturedProductInfo/FeaturedProductInfo";

const HomeFeatureThree = (props) => {
  const { featuredProduct } = props;
  const { slug } = featuredProduct;
  return (
    <section className="home-feature-three-container">
      <div className="home-feature-three-image-container"></div>
      <div className="home-feature-three-text-container content-slab">
        <FeaturedProductInfo
          featuredProduct={featuredProduct}
          isHomeFeatureThree
          customHeaderText="YX1 earphones"
          buttonData={{
            buttonColor: "transparent",
            buttonDestination: `product-${slug}`,
          }}
        />
      </div>
    </section>
  );
};

export default HomeFeatureThree;
