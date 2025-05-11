import styled from "styled-components";
import { BASE_URL, Button, Container } from "../../App";


const SearchResult = ({data}) => {
  return (
    <FoodCardContainer>
      <Container>
        <FoodCards>
              {data?.map(({name, image, text, price}) => (
                <FoodCard key={name}>
                      <div className="food_image">
                          <img src={BASE_URL + image} alt="food images" />
                      </div>
                      <div className="food_info">
                          <div className="info">
                              <h3>{name}</h3>
                              <p>{text}</p>
                          </div>
                          <Button>${price.toFixed(2)}</Button>
                      </div>
                </FoodCard>
            ))}
        </FoodCards>
      </Container>
        
    </FoodCardContainer>
  )
}

export default SearchResult

const FoodCardContainer = styled.section`
  background-color: #ffbcbc;
/*
  background-image: url("/images/bg_image.jpg");
  background-size: cover;*/
  min-height: calc(100vh - 145px);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  padding: 40px 100px;
`;

const FoodCards = styled.div`
width:100%;
display: flex;
flex-wrap: wrap;
row-gap: 32px;
column-gap: 20px;
justify-content: center;
align-items: center;
padding-top: 80px;
padding: 70px;
`;

const FoodCard = styled.div`

  width: 340px;
  min-height: 190px;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.2); /* glass effect */
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  color:black;
  padding: 10px;
  
  display: flex;
  justify-content: center;
  align-items: start;

  .food_info {
    height: 100%;
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content:space-between;
    align-items: end;

    .info{
      flex-grow:1;
    }

    h3{
        margin-top: 10px;
        font-size: 16px;
        font-weight: 800;
    }
    p{
        margin-top: 10px;
        margin-bottom: 35px;
        font-size: 13px;
    }
  }
`;
