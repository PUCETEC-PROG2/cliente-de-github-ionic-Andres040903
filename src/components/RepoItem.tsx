import './RepoItem.css';
import React from 'react';
import {
  IonItem,
  IonLabel,
  IonThumbnail,
  IonButton,
  IonIcon,
  useIonAlert,
  useIonToast
} from '@ionic/react';
import { trash, create } from 'ionicons/icons';
import { RepositoryItem } from '../interfaces/RepositoryItem';
import { deleteRepository, updateRepository } from '../services/GithubService';

interface RepoItemProps extends RepositoryItem {
  onUpdate: () => void;
}

const RepoItem: React.FC<RepoItemProps> = ({ name, description, imageUrl, owner, language, onUpdate }) => {
  
  const [presentAlert] = useIonAlert();
  const [presentToast] = useIonToast();

  const handleDelete = () => {
    presentAlert({
      header: '¿Eliminar repositorio?',
      message: `Estás a punto de borrar ${name}.`,
      buttons: [
        'Cancelar',
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: async () => {
            if (owner) {
              const success = await deleteRepository(owner, name);
              if (success) {
                presentToast({ message: 'Eliminado correctamente', color: 'success', duration: 2000 });
                onUpdate(); 
              } else {
                presentToast({ message: 'Error al eliminar', color: 'danger', duration: 3000 });
              }
            }
          },
        },
      ],
    });
  };

  const handleEdit = () => {
    presentAlert({
      header: 'Editar Descripción',
      inputs: [
        {
          name: 'description',
          type: 'textarea',
          placeholder: 'Nueva descripción',
          value: description
        }
      ],
      buttons: [
        'Cancelar',
        {
          text: 'Guardar',
          handler: async (data) => {
            if (owner) {
              const success = await updateRepository(owner, name, undefined, data.description);
              if (success) {
                presentToast({ message: 'Actualizado correctamente', color: 'success', duration: 2000 });
                onUpdate();
              } else {
                presentToast({ message: 'Error al actualizar', color: 'danger', duration: 2000 });
              }
            }
          },
        },
      ],
    });
  };

  return (
    <IonItem>
        <IonThumbnail slot="start">
            <img alt="Repo" src={imageUrl || "https://ionicframework.com/docs/img/demos/thumbnail.svg"} />
        </IonThumbnail>
        <IonLabel className="ion-text-wrap">
          <h2>{name}</h2>
          <p>{description || "Sin descripción"}</p>
          <p style={{ fontSize: '0.8rem', color: '#666' }}>Propietario: {owner}</p>
          {language && <p style={{ fontSize: '0.8rem', color: '#888' }}>Lenguaje: {language}</p>}
        </IonLabel>

        <IonButton fill="clear" color="primary" slot="end" onClick={handleEdit}>
            <IonIcon icon={create} slot="icon-only" />
        </IonButton>

        <IonButton fill="clear" color="danger" slot="end" onClick={handleDelete}>
            <IonIcon icon={trash} slot="icon-only" />
        </IonButton>
    </IonItem>
  );
};

export default RepoItem;