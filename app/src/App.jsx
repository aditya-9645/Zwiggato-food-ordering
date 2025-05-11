import { useEffect, useState } from 'react';
import styled from 'styled-components';
import SearchResult from './components/SearchResults/SearchResult';

export const BASE_URL = "http://localhost:9000";

const App = () => {



  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filteredData, setFilteredData] = useState(null);
  const [selectedBtn, setSelectedBtn] = useState("all");
  
  useEffect(() => {
    const fetchFoodData = async () => {
      setLoading(true);
      try{
        const response = await fetch(BASE_URL);
        const json = await response.json();
        setData(json);
        setFilteredData(json);
        setLoading(false);
      }
      catch(error){
        setError(`Error encountered: ${error} Possile reason : Unable to fetch data from backend`);
      }
    };
    fetchFoodData();
  },[]);

  if(error) return <div>{error}</div>;
  if(loading) return <div>Loading...</div>;
  
  const searchFood = (e) => {
    const searchValue = e.target.value;

    if(searchValue===""){
      setFilteredData(null);
    }

    const filter = data?.filter((food) => 
      food.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredData(filter);
  };

  const filterFood = (type) => {
    if(type == "all"){
      setSelectedBtn("all");
      setFilteredData(data); 
      return;
    }
    const filter = data?.filter((food) => 
      food.type.toLowerCase().includes(type.toLowerCase()));

    setSelectedBtn(type);
    setFilteredData(filter);
  };

  const filterBtns = [
    {
      name:"All",
      type:"all"
    },
    {
      name: "Breakfast",
      type: "breakfast"
    },
    {
      name: "Lunch",
      type: "lunch"
    },{
      name: "Dinner",
      type: "dinner"
    }
  ]
  

  return<>
          <Container>
            <TopContainer>
              <div className='logo_and_search'>
                <img src="/images/Zwiggato.svg" alt="logo"/>
                <input onChange={searchFood} type="text" placeholder='Search Food...' />
              </div>
              <div className='FilterContainer'>
                
                {filterBtns.map((filterValue) => (
                  <Button  isSelected={selectedBtn == filterValue.type}  key={filterValue.name} onClick={() => filterFood(filterValue.type)}>
                    {filterValue.name}
                  </Button>
                ))}
                
                
              </div>
            </TopContainer>
            <SearchResult data = {filteredData}/>

          </Container>
        </>
};

export default App;

export const Container = styled.div`
  max-width: 99vw;
  margin: 0 auto; 
`;
const TopContainer = styled.div`
  background-color: #000000;
  color: white;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
  .logo_and_search{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 40px;
    padding-right: 40px;
    padding-top:20px;
    @media (0 <= width <= 600px){
      flex-direction: column;
    }
    input{
      background-color: transparent;
      color: white;
      height: 40px;
      padding: 5px 10px;
      border: 1px solid red;
      border-radius: 5px;
      font-size: 16px;
      &::placeholder{
        color: white;
      }
      @media (0 <= width <= 600px){
        margin-top: 15px;
        margin-bottom: 5px;
      }
    }
    img{
      height:45px;
    }
  }

  

  .FilterContainer{
    padding: 16px;
    display: flex;
    align-self: center;
    gap: 12px;
  }
`;


export const Button = styled.button`
  font-size: 17px;
  padding: 3px 18px;
  background-color: ${(props) => (props.isSelected ? "#ffffff" : "#ff4444")};
  color: ${(props) => (props.isSelected ? "#ff0000" : "#ffffff")};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  height:30px;
  transition: all 0.3s ease-in;
  &:hover{
    background-color: white;
    color: red;
    
  }
`;
















{/*

  <Button onClick={() => filterFood("all")}>All</Button>
  <Button onClick={() => filterFood("breakfast")}>Breakfast</Button>
  <Button onClick={() => filterFood("lunch")}>Lunch</Button>
  <Button onClick={() => filterFood("dinner")}>Dinner</Button>


  Can be replaced by:
  
    const filterBtns = [
    {
      name:"All",
      type:"all"
    },
    {
      name: "Breakfast",
      type: "breakfast"
    },
    {
      name: "Lunch",
      type: "lunch"
    },{
      name: "Dinner",
      type: "dinner"
    }
  ]
    
  {filterBtns.map((filterValue) => (
      <Button key={filterValue.name} onClick={() => filterFood(filterValue.type)}>
        {filterValue.name}
      </Button>
  ))}

  
  
  */}