/* eslint-disable */
import React from "react";
import {
  MDBCarousel,
  MDBCarouselCaption,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBView,
  MDBMask,
} from "mdbreact";

const CarouselPage = () => {
  return (
    <div>
      <MDBCarousel
        activeItem={1}
        length={3}
        showControls={true}
        showIndicators={false}
        className="z-depth-1">
        <MDBCarouselInner style={{ height: 400 }}>
          <MDBCarouselItem itemId="1">
            <MDBView>
              <img
                style={{ height: 400 }}
                className="d-block w-100 center"
                src="Image/momo.png"
                alt="sport"
              />
              <MDBMask overlay="black-light" />
            </MDBView>
            <MDBCarouselCaption>
              <h3 className="h3-responsive">Foods</h3>
              <p>ReadyBelly</p>
            </MDBCarouselCaption>
          </MDBCarouselItem>
          <MDBCarouselItem itemId="2">
            <MDBView>
              <img
                style={{ height: 400 }}
                className="d-block w-100"
                src="Image/food3.jpg"
                alt="sport"
              />
              <MDBMask overlay="black-strong" />
            </MDBView>
            <MDBCarouselCaption>
              <h3 className="h3-responsive">ReadyBelly</h3>
              <p>Foods</p>
            </MDBCarouselCaption>
          </MDBCarouselItem>
          <MDBCarouselItem itemId="3">
            <MDBView>
              <img
                style={{ height: 400 }}
                className="d-block w-100 center"
                src="Image/momo.png"
                alt="sport"
              />
              <MDBMask overlay="black-slight" />
            </MDBView>
            <MDBCarouselCaption>
              <h3 className="h3-responsive">ReadyBelly</h3>
              <p>Foods</p>
            </MDBCarouselCaption>
          </MDBCarouselItem>
        </MDBCarouselInner>
      </MDBCarousel>
    </div>
  );
};

export default CarouselPage;
