import React, { useState } from 'react';
import { 
  IonButton, 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTextarea, 
  IonTitle, 
  IonToolbar, 
  IonInput, 
  useIonToast, 
  useIonLoading 
} from '@ionic/react';
import './Tab2.css';
import { useHistory } from 'react-router-dom';
import { createRepository } from '../services/GithubService';

const Tab2: React.FC = () => {
  const history = useHistory();
  
  // Usamos useState para manejar los datos del formulario
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [presentToast] = useIonToast();
  const [present, dismiss] = useIonLoading();

  const saveRepo = async () => {
    // Validación del formulario
    if (!name.trim()) {
      presentToast({
        message: 'El nombre del repositorio es obligatorio',
        duration: 2000,
        color: 'warning',
        position: 'top'
      });
      return;
    }

    await present({
      message: 'Creando repositorio...',
    });

    try {
      await createRepository(name, description);
      await dismiss();

      presentToast({
        message: '¡Repositorio creado con éxito!',
        duration: 2000,
        color: 'success', 
        position: 'bottom'
      });

      // Limpiar formulario
      setName('');
      setDescription('');

      history.push('/tab1');

    } catch (error) {
      await dismiss();
      console.error('Error creating repository:', error);
      
      presentToast({
        message: 'Error al crear el repositorio. Revisa la consola.',
        duration: 3000,
        color: 'danger',
        position: 'bottom'
      });
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Crear Repositorio</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Crear Repositorio</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="form-container" style={{ padding: '20px' }}>
          {/* Input Nombre */}
          <IonInput
            className="form-field"
            label="Nombre del repositorio"
            labelPlacement="floating"
            fill="outline"
            value={name}
            onIonInput={(e) => setName(e.detail.value!)} 
            style={{ marginBottom: '20px' }}
          ></IonInput>

          {/* Input Descripción */}
          <IonTextarea
            className="form-field"
            label="Descripción (Opcional)"
            labelPlacement="floating"
            fill="outline"
            rows={4}
            autoGrow
            value={description}
            onIonInput={(e) => setDescription(e.detail.value!)}
            style={{ marginBottom: '20px' }}
          ></IonTextarea>

          {/* Botón Guardar */}
          <IonButton expand="block" color="success" className="form-field" onClick={saveRepo}>
            Crear
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;