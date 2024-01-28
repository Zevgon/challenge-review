import React from "react";

interface Props {
  className?: string;
  src: string;
  altText: string;
}

const CustomImage = ({ className, src, altText }: Props) => {
  return <img className={className && className} src={src} alt={altText}></img>;
};

export default CustomImage;
