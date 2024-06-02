import React, {useEffect} from "react";
import styles from "./App.module.scss";
import Header from "./components/layouts/Header.tsx";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import About from "./components/about/About.tsx";
import TheJury from "./components/thejury/TheJury.tsx";
import Tokenomics from "./components/tokenomics/Tokenomics.tsx";
import Drop from "./components/drop/drop.tsx";
import Footer from "./container/Footer.tsx";
import JoinJury from "./components/layouts/JoinJury";
import { QueryParamProvider } from 'use-query-params';
import { WagmiConfig, createConfig, configureChains } from 'wagmi'
import { mainnet, sepolia, bscTestnet } from 'wagmi/chains'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from "@web3modal/react";

const projectId = '7c7fff7dcdf68099b497f697a163e920'

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, sepolia, bscTestnet],
  [w3mProvider({ projectId })],
)


const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'wagmi',
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: '7c7fff7dcdf68099b497f697a163e920',
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: 'Injected',
        shimDisconnect: true,
      },
    }),
  ],
  publicClient,
  webSocketPublicClient,
})

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient
})
const ethereumClient = new EthereumClient(wagmiConfig, chains);
const App = () => {
  return (
    <Router>
      <QueryParamProvider>
      <div className={styles.App} style={{ height: 'auto'}}>
        <WagmiConfig config={config}>
          <Switch>
            <div className={styles.content}>
              <Route exact path="/">
                <Header />
                <div id="About">
                  <About/>
                </div>
                <div id="TheJury">
                  <TheJury/>
                </div>
                <div id="Tokenomics">
                  <Tokenomics/>
                </div>
                <div id="Drop">
                  <Drop />
                </div>
                <Footer/>
              </Route>
              <Route exact path="/joinjury">
                <JoinJury/>
              </Route>
            </div>
          </Switch>
        </WagmiConfig>
        <Web3Modal
          projectId="7c7fff7dcdf68099b497f697a163e920"
          ethereumClient={ethereumClient}
        />
      </div>
      </QueryParamProvider>
    </Router>
  );
};

export default App;
