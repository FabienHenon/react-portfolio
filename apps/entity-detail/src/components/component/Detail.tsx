import React, { MouseEvent, ReactElement, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { MfMaestroProps as AppProps } from "../../types";
import useComponentReadyEvent from "../effects/componentReadyEvent";
import useFetchEntityEvent from "../effects/fetchEntityEvent";
import useFetchEntity from "../effects/fetchEntity";
import dataTest from "../utils/data-test";

const eventNameForEntityFromDomain = (domain: string) => (state: string) => `${domain}:entity-detail:${state}`;

const Detail: React.FC<AppProps> = ({ params, options, config, domain }: AppProps) => {
  const eventNameForEntity = useMemo(() => eventNameForEntityFromDomain(domain), [domain]);
  const { t } = useTranslation();

  useComponentReadyEvent(eventNameForEntity, options.events);
  useFetchEntityEvent(params.id, eventNameForEntity, options.events);

  const onClose = (e: MouseEvent): void => {
    e.preventDefault();
    options.events.emit(eventNameForEntity('close'), { id: params.id });
  };

  const onDelete = (e: MouseEvent): void => {
    e.preventDefault();
    options.events.emit(eventNameForEntity('delete'), { id: params.id });
  };

  const onEdit = (e: MouseEvent): void => {
    e.preventDefault();
    options.events.emit(eventNameForEntity('edit'), { id: params.id });
  };

  const { started, pending, error, result } = useFetchEntity(params.id, eventNameForEntity, options.events);

  const closeBtn = (): ReactElement | null => {
    if (params.closable) {
      return <div
        className="close"
        onClick={onClose}
        data-test-id={dataTest("close-entity")}
      >
        {t('common:close')}
      </div>;
    } else {
      return null;
    }
  };

  const editBtn = (): ReactElement | null => {
    if (params.editable) {
      return <div
        className="edit"
        onClick={onEdit}
        data-test-id={dataTest("edit-entity")}
      >
        {t('common:edit')}
      </div>;
    } else {
      return null;
    }
  };

  const deleteBtn = (): ReactElement | null => {
    if (params.deletable) {
      return <div
        className="delete"
        onClick={onDelete}
        data-test-id={dataTest("delete-entity")}
      >
        {t('common:delete')}
      </div>;
    } else {
      return null;
    }
  };

  const viewEntity = () => {
    if (result) {
      return <div
        className="entity"
        data-test-id={dataTest("entity-fetched")}
      >
        <div className="entity__firstname">
          <span className="entity__firstname__label">
            {t('firstnameLabel')}
          </span>
          <span className="entity__firstname__value">
            {result.firstname}
          </span>
        </div>
        <div className="entity__lastname">
          <span className="entity__lastname__label">
            {t('lastnameLabel')}
          </span>
          <span className="entity__lastname__value">
            {result.lastname}
          </span>
        </div>
      </div>;
    } else if (error) {
      return <div data-test-id={dataTest("entity-error")}>
        {t('entityError')}
      </div>;
    } else if (!started) {
      return <div data-test-id={dataTest("entity-not-fetched")}>
        {t('entityNotAsked')}
      </div>;
    } else if (pending) {
      return <div data-test-id={dataTest("entity-loading")}>
        {t('entityLoading')}
      </div>;
    }
  };

  return (
    <div className="m-entity-detail">
      <div className="header">
        {closeBtn()}
        {editBtn()}
        {deleteBtn()}
      </div>
      {viewEntity()}
    </div>
  );
};

export default Detail;
