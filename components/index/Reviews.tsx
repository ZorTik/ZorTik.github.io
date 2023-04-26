import styled from "styled-components";
import {Row} from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel"
import Image from "next/image";

const ReviewsComponent = styled(Row)`
    margin-top: 50px;
`;

const CarouselItem = styled(Carousel.Item)`
  
`;

type ReviewProps = {
    user: string,
    quot: string
}

const Review = (props: ReviewProps) => {
    return (
        <CarouselItem>
            <p>t</p>
            <Image src="/user.png" width={50} height={50} alt="" />
            <Carousel.Caption>
                <h3>{props.user}</h3>
                <p>{props.quot}</p>
            </Carousel.Caption>
        </CarouselItem>
    )
}

const Reviews = () => {
    return <ReviewsComponent>
        <Carousel>
            <Review user="User1" quot="Quot" />
            <Review user="User2" quot="Quot2" />
        </Carousel>
    </ReviewsComponent>
}

export default Reviews;
