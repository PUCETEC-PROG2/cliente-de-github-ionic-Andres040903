import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonViewDidEnter } from '@ionic/react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import './Tab3.css';
import { useState } from 'react';
import { getUserInfo } from '../services/GithubService';
import { UserInfo } from '../interfaces/UserInfo';

const Tab3: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "Usuario no encontrado",
    login: "no-username",
    bio: "No se encuentra usuario",
    avatar_url: "https://avatars.githubusercontent.com/u/168913023?v=4"
  });

const loadUserInfo = async () => {
  const response = await getUserInfo();
  if (response) {
    setUserInfo(response);
  }
};

useIonViewDidEnter(() => {
  loadUserInfo();
});

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Perfil del Usuario</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Perfil del Usuario</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="card-container">
          <IonCard className="card">
            <img alt="Silhouette of mountains" src={userInfo.avatar_url} />
            <IonCardHeader>
              <IonCardTitle>{userInfo.name}</IonCardTitle>
              <IonCardSubtitle>{userInfo.login}</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>{userInfo.bio}</IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;