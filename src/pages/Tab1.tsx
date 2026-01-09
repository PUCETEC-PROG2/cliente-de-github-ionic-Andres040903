import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewDidEnter,
} from "@ionic/react";
import { IonList } from "@ionic/react";
import "./Tab1.css";
import RepoItem from "../components/RepoItem";
import React from "react";
import { RepositoryItem } from "../interfaces/RepositoryItem";
import { fetchRepositories } from "../services/GithubService";

const Tab1: React.FC = () => {
  const [repos, setRepos] = React.useState<RepositoryItem[]>([]);

  const loadRepos = async () => {
    const reposData = await fetchRepositories();
    setRepos(reposData);
  };

  useIonViewDidEnter(() => {
    console.log("******* Leyendo repositorios ... *******");
    loadRepos();
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mis Repositorios</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Mis Repositorios</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          {repos.map((repo, index) => (
            <RepoItem
              key={repo.name + index}
              name={repo.name}
              description={repo.description}
              imageUrl={repo.imageUrl}
              owner={repo.owner}
              language={repo.language}
              onUpdate={loadRepos} 
            />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;