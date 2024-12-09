import React, { MouseEvent, ReactElement, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { MfMaestroProps as AppProps } from "../../types";
import useComponentReadyEvent from "../effects/componentReadyEvent";
import useFetchEntitiesEvent from "../effects/fetchEntitiesEvent";
import useFetchEntities from "../effects/fetchEntities";
import dataTest from "../utils/data-test";
import { Entity } from "../resources/entity";

const eventNameForEntityFromDomain = (domain: string) => (state: string) => `${domain}:entity-master:${state}`;

const Master: React.FC<AppProps> = ({ params, options, config, domain }: AppProps) => {
  const eventNameForEntity = useMemo(() => eventNameForEntityFromDomain(domain), [domain]);
  const { t } = useTranslation();

  useComponentReadyEvent(eventNameForEntity, options.events);
  useFetchEntitiesEvent(eventNameForEntity, options.events);

  const onClose = (e: MouseEvent): void => {
    e.preventDefault();
    options.events.emit(eventNameForEntity('close'), {});
  };

  const onDelete = (id: string) => (e: MouseEvent): void => {
    e.preventDefault();
    options.events.emit(eventNameForEntity('delete'), { id: id });
  };

  const onEdit = (id: string) => (e: MouseEvent): void => {
    e.preventDefault();
    options.events.emit(eventNameForEntity('edit'), { id: id });
  };

  const onClick = (id: string) => (e: MouseEvent): void => {
    e.preventDefault();
    options.events.emit(eventNameForEntity('clicked'), { id: id });
  };

  const { started, pending, error, result } = useFetchEntities(eventNameForEntity, options.events);

  const closeBtn = (): ReactElement | null => {
    if (params.closable) {
      return <div
        className="close"
        onClick={onClose}
        data-test-id={dataTest("close-entities")}
      >
        {t('common:close')}
      </div>;
    } else {
      return null;
    }
  };

  const editBtn = (id: string): ReactElement | null => {
    if (params.editable) {
      return <div
        className="edit"
        onClick={onEdit(id)}
        data-test-id={dataTest(`edit-entity:${id}`)}
      >
        {t('common:edit')}
      </div>;
    } else {
      return null;
    }
  };

  const deleteBtn = (id: string): ReactElement | null => {
    if (params.deletable) {
      return <div
        className="delete"
        onClick={onDelete(id)}
        data-test-id={dataTest(`delete-entity:${id}`)}
      >
        {t('common:delete')}
      </div>;
    } else {
      return null;
    }
  };

  const viewEntities = () => {
    if (result) {
      return <table
        className="entities"
        data-test-id={dataTest("entities-fetched")}
      >
        <thead>
          <tr>
            <th>{t('firstnameLabel')}</th>
            <th>{t('lastnameLabel')}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {result.map(viewEntity)}
        </tbody>
      </table>;
    } else if (error) {
      return <div data-test-id={dataTest("entities-error")}>
        {t('entityError')}
      </div>;
    } else if (!started) {
      return <div data-test-id={dataTest("entities-not-fetched")}>
        {t('entityNotAsked')}
      </div>;
    } else if (pending) {
      return <div data-test-id={dataTest("entities-loading")}>
        {t('entityLoading')}
      </div>;
    }
  };

  const viewEntity = (entity: Entity): ReactElement => {
    return <tr
      className="entity"
      onClick={onClick(entity.id)}
      data-test-id={dataTest(`entity:${entity.id}`)}
      data-test-class={dataTest("entity")}
      key={`entity:${entity.id}`}
    >
      <td>
        <span className="entity__firstname">{entity.firstname}</span>
      </td>
      <td>
        <span className="entity__lastname">{entity.lastname}</span>
      </td>
      <td>
        {editBtn(entity.id)}
        {deleteBtn(entity.id)}
      </td>
    </tr>;
  };

  return (
    <div className="m-entity-master">
      <div className="header">
        {closeBtn()}
      </div>
      {viewEntities()}
    </div>
  );
};

export default Master;
