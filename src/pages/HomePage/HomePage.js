import {
  HomePageContainer,
  RecordsContainer,
  RecordValue,
  RecordsList,
  HomeNavBar,
  HomeFooter,
  NoRecordsContainer,
} from "./Styled";
import { Link } from "react-router-dom";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { UserContext } from "../../contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import apiRecords from "../../services/apiRecords";
import { ThreeDots } from "react-loader-spinner";

export default function HomePage() {
  const { userName, userToken } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false); // MUDAR APÓS ATUALIZAR O BACKEND
  const [records, setRecords] = useState([4]);

  function getRecordsList() {
    apiRecords
      .getRecords(userToken)
      .then((res) => {
        setIsLoading(false);
        setRecords(res.data);
      })
      .catch((err) => {
        setIsLoading(false);
        alert(err.response.data);
      });
  }

  return (
    <HomePageContainer>
      <HomeNavBar>
        <h1 data-test="user-name">Olá, {userName} </h1>
        <Link to="/">
          <RiLogoutBoxRLine size={30} data-test="logout" />
        </Link>
      </HomeNavBar>

      <RecordsContainer>
        {isLoading ? (
          <ThreeDots
            width={80}
            height={40}
            color={"#868686"}
            wrapperStyle={{ "background-color": "#FFFFFF" }}
          />
        ) : records.length === 0 ? (
          <NoRecordsContainer>
            <p>
              Não há registros de
              <br /> entrada ou saída
            </p>
          </NoRecordsContainer>
        ) : (
          <RecordsList>
            <section>
              <span data-test="registry-amount">30/11</span>
              <li data-test="registry-name">
                OI
                <RecordValue color={"green"}>500,00</RecordValue>
              </li>
            </section>
            <section>
              <span data-test="registry-amount">27/04</span>
              <li data-test="registry-name">
                arroz
                <RecordValue color={"red"}>47,00</RecordValue>
              </li>
            </section>
          </RecordsList>
        )}
      </RecordsContainer>

      <HomeFooter>
        <Link to="/nova-entrada" data-test="new-income">
          <AiOutlinePlusCircle size={25} />
          Nova
          <br />
          entrada
        </Link>

        <Link to="/nova-saida" data-test="new-expense">
          <AiOutlineMinusCircle size={25} />
          Nova
          <br />
          saída
        </Link>
      </HomeFooter>
    </HomePageContainer>
  );
}
