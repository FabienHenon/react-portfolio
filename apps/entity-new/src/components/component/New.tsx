import React, { MouseEvent, ReactElement, FormEvent, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { MfMaestroProps as AppProps } from "../../types";
import useComponentReadyEvent from "../effects/componentReadyEvent";
import useCreateEntity from "../effects/createEntity";
import { EntitySchema } from "../validators/entity";
import dataTest from "../utils/data-test";
import useForm from "react-hook-form";

const eventNameForEntityFromDomain = (domain: string) => (state: string) =>
  `${domain}:entity-new:${state}`;

const New: React.FC<AppProps> = ({
  params,
  options,
  config,
  domain
}: AppProps) => {
  const eventNameForEntity = useMemo(() => eventNameForEntityFromDomain(domain), [domain]);
  const { t } = useTranslation();

  useComponentReadyEvent(eventNameForEntity, options.events);

  const [
    { started, pending, error, result },
    createEntity
  ] = useCreateEntity(eventNameForEntity, options.events);

  const { register, handleSubmit, setValue, formState } = useForm({
    mode: 'onChange',
    validationSchema: EntitySchema
  })

  const onClose = (e: MouseEvent): void => {
    e.preventDefault();
    options.events.emit(eventNameForEntity("close"), {});
  };

  const onFirstnameChanged = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue('firstname', e.target.value);
    options.events.emit(eventNameForEntity("changed"), {
      value: e.target.value,
      field: "firstname"
    });
  };

  const onLastnameChanged = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue('lastname', e.target.value);
    options.events.emit(eventNameForEntity("changed"), {
      value: e.target.value,
      field: "lastname"
    });
  };

  const onSubmit = async ({ firstname, lastname }: Record<string, any>) => {
    options.events.emit(eventNameForEntity("submitted"), {});
    return await createEntity({ firstname, lastname });
  };

  const closeBtn = (): ReactElement | null => {
    if (params.closable) {
      return (
        <div
          className="close"
          onClick={onClose}
          data-test-id={dataTest("close-entity")}
        >
          {t("common:close")}
        </div>
      );
    } else {
      return null;
    }
  };

  const viewForm = () => {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="field">
          <input
            onChange={onFirstnameChanged}
            className="input"
            name="firstname"
            placeholder={t("firstnameLabel")}
            data-test-id={dataTest("entity-input-firstname")}
            ref={register}
          />
          <input
            onChange={onLastnameChanged}
            className="input"
            name="lastname"
            placeholder={t("lastnameLabel")}
            data-test-id={dataTest("entity-input-lastname")}
            ref={register}
          />
          <div className="actions">
            <input
              data-test-id={dataTest("entity-submit")}
              disabled={!formState.isValid}
              type="submit"
              value={t<string>("common:submit")}
            />
          </div>
        </div>
      </form>
    );
  };

  const viewCreatedEntity = () => {
    if (result) {
      return (
        <div data-test-id={dataTest("new-entity-created")}>
          {t("entityCreated")}
        </div>
      );
    } else if (error) {
      return <div data-test-id={dataTest("new-entity-error")}>
        {t('entityError')}
      </div>;
    } else if (!started) {
      return null;
    } else if (pending) {
      return <div data-test-id={dataTest("new-entity-loading")}>
        {t('entityLoading')}
      </div>;
    }
  };

  return (
    <div className="m-entity-new">
      <div className="header">{closeBtn()}</div>
      <div className="form">{viewForm()}</div>
      {viewCreatedEntity()}
    </div>
  );
};

export default New;
