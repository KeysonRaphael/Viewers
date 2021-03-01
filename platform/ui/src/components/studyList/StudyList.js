import './StudyList.styl';

import React from 'react';
// import classNames from 'classnames';
import TableSearchFilter from './TableSearchFilter.js';
import PropTypes from 'prop-types';
import { StudyListLoadingText } from './StudyListLoadingText.js';
import { useTranslation } from 'react-i18next';

const getContentFromUseMediaValue = (
  displaySize,
  contentArrayMap,
  defaultContent
) => {
  const content =
    displaySize in contentArrayMap
      ? contentArrayMap[displaySize]
      : defaultContent;

  return content;
};
/**
 *
 *
 * @param {*} props
 * @returns
 */
function StudyList(props) {
  const {
    isLoading,
    hasError,
    studies,
    sort,
    onSort: handleSort,
    filterValues,
    onFilterChange: handleFilterChange,
    onSelectItem: handleSelectItem,
    studyListDateFilterNumDays,
    displaySize,
  } = props;
  const { t, ready: translationsAreReady } = useTranslation('StudyList');

  const largeTableMeta = [
    {
      displayText: t('PatientName'),
      fieldName: 'PatientName',
      inputType: 'text',
      size: 330,
    },
    {
      displayText: t('MRN'),
      fieldName: 'PatientID',
      inputType: 'text',
      size: 378,
    },
    {
      displayText: t('AccessionNumber'),
      fieldName: 'AccessionNumber',
      inputType: 'text',
      size: 180,
    },
    {
      displayText: t('StudyDate'),
      fieldName: 'StudyDate',
      inputType: 'date-range',
      size: 300,
    },
    {
      displayText: t('Modality'),
      fieldName: 'modalities',
      inputType: 'text',
      size: 114,
    },
    {
      displayText: t('StudyDescription'),
      fieldName: 'StudyDescription',
      inputType: 'text',
      size: 335,
    },
  ];

  const mediumTableMeta = [
    {
      displayText: `${t('PatientName')} / ${t('MRN')}`,
      fieldName: 'patientNameOrId',
      inputType: 'text',
      size: 250,
    },
    {
      displayText: t('Description'),
      fieldName: 'accessionOrModalityOrDescription',
      inputType: 'text',
      size: 350,
    },
    {
      displayText: t('StudyDate'),
      fieldName: 'StudyDate',
      inputType: 'date-range',
      size: 300,
    },
  ];

  const smallTableMeta = [
    {
      displayText: t('Search'),
      fieldName: 'allFields',
      inputType: 'text',
      size: 100,
    },
  ];

  const tableMeta = getContentFromUseMediaValue(
    displaySize,
    { large: largeTableMeta, medium: mediumTableMeta, small: smallTableMeta },
    smallTableMeta
  );

  const totalSize = tableMeta
    .map(field => field.size)
    .reduce((prev, next) => prev + next);

  return translationsAreReady ? (
    <div>
      <table className="table table--striped table--hoverable">
        <colgroup>
          {tableMeta.map((field, i) => {
            const size = field.size;
            const percentWidth = (size / totalSize) * 100.0;
            return <col key={i} style={{ width: `${percentWidth}%` }} />;
          })}
        </colgroup>
        <thead className="table-head">
          <tr className="filters">
            <TableSearchFilter
              meta={tableMeta}
              values={filterValues}
              onSort={handleSort}
              onValueChange={handleFilterChange}
              sortFieldName={sort.fieldName}
              sortDirection={sort.direction}
              studyListDateFilterNumDays={studyListDateFilterNumDays}
            />
          </tr>
        </thead>
      </table>
      <table
        className="table table--striped table--hoverable"
        style={{
          border: '1px solid #ddd',
          textAlign: 'left',
        }}
      >
        <thead>
          <tr style={{
            border: '1px solid #ddd',
            borderRadius: '5px',
            borderCollapse: 'initial',
          }}>
            <th
              style={{
                paddingTop: '8px',
                paddingBottom: '8px',
                paddingLeft: '8px',
              }}
            >
              <b>Unidade</b>
            </th>
            <th
              style={{
                paddingTop: '8px',
                paddingBottom: '8px',
                paddingLeft: '8px',
              }}
            >
              <b>Prontuario</b>
            </th>
            <th
              colSpan="3"
              style={{
                paddingTop: '8px',
                paddingBottom: '8px',
                paddingLeft: '8px',
              }}
            >
              <b>Paciente</b>
            </th>
            {/* <td>
              <b>Tipo do exame</b>
            </td> */}
            <th
              style={{
                paddingTop: '8px',
                paddingBottom: '8px',
                paddingLeft: '8px',
              }}
            >
              <b>Data do exame</b>
            </th>
            <th
              colSpan="3"
              style={{
                paddingTop: '8px',
                paddingBottom: '8px',
                paddingLeft: '8px',
              }}
            >
              <b>Descrição do exame</b>
            </th>
          </tr>
        </thead>
        <tbody className="table-body" data-cy="study-list-results">
          {/* I'm not in love with this approach, but it's the quickest way for now
           *
           * - Display different content based on loading, empty, results state
           *
           * This is not ideal because it create a jump in focus. For loading especially,
           * We should keep our current results visible while we load the new ones.
           */}
          {/* LOADING */}
          {isLoading && (
            <tr className="no-hover">
              <td colSpan={tableMeta.length}>
                <StudyListLoadingText />
              </td>
            </tr>
          )}
          {!isLoading && hasError && (
            <tr className="no-hover">
              <td colSpan={tableMeta.length}>
                <div className="notFound">
                  {t('There was an error fetching studies')}
                </div>
              </td>
            </tr>
          )}
          {/* EMPTY */}
          {!isLoading && !studies.length && (
            <tr className="no-hover">
              <td colSpan={tableMeta.length}>
                <div className="notFound">{t('No matching results')}</div>
              </td>
            </tr>
          )}
          {!isLoading &&
            studies.map((study, index) => (
              <TableRow
                key={`${study.StudyInstanceUID}-${index}`}
                onClick={StudyInstanceUID => handleSelectItem(StudyInstanceUID)}
                AccessionNumber={study.AccessionNumber || ''}
                modalities={study.modalities}
                PatientID={study.PatientID || ''}
                PatientName={study.PatientName || ''}
                StudyDate={study.StudyDate}
                StudyDescription={study.StudyDescription || ''}
                StudyInstanceUID={study.StudyInstanceUID}
                displaySize={displaySize}
              />
            ))}
        </tbody>
      </table>
    </div>
  ) : null;
}

StudyList.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
  studies: PropTypes.array.isRequired,
  onSelectItem: PropTypes.func.isRequired,
  // ~~ SORT
  sort: PropTypes.shape({
    fieldName: PropTypes.string,
    direction: PropTypes.oneOf(['desc', 'asc', null]),
  }).isRequired,
  onSort: PropTypes.func.isRequired,
  // ~~ FILTERS
  filterValues: PropTypes.shape({
    PatientName: PropTypes.string.isRequired,
    PatientID: PropTypes.string.isRequired,
    AccessionNumber: PropTypes.string.isRequired,
    StudyDate: PropTypes.string.isRequired,
    modalities: PropTypes.string.isRequired,
    StudyDescription: PropTypes.string.isRequired,
    patientNameOrId: PropTypes.string.isRequired,
    accessionOrModalityOrDescription: PropTypes.string.isRequired,
    allFields: PropTypes.string.isRequired,
    studyDateTo: PropTypes.any,
    studyDateFrom: PropTypes.any,
  }).isRequired,
  onFilterChange: PropTypes.func.isRequired,
  studyListDateFilterNumDays: PropTypes.number,
  displaySize: PropTypes.string,
};

StudyList.defaultProps = {};

function appendRow() {
  var table = event.target.parentNode.parentNode;
  var index = event.target.parentNode.rowIndex + 1;
  var row = table.insertRow(index);
  return;
}

function TableRow(props) {
  const {
    // AccessionNumber,
    // isHighlighted,
    // modalities,
    // PatientID, //id do paciente(Ac. Number)2619416
    RecordID = '2089970', //id do prontuario 1
    PatientName, //nome do paciente 1
    UnityName = 'chn', //nome da unidade 1
    StudyDate, // 1
    StudyDescription,
    ExamDescription = 'DOPPLER VENOSO PROFUNDO DE MEMBRO INFERIOR DIREITO', //descrição do exame 1
    ExamStatus = 'Sem Laudo', //status do exame (mostrar apenas alguma indicação de cor da situação)
    ExamType = 'Radiologia', //tipo do exame
    StudyInstanceUID,
    onClick: handleClick,
    displaySize,
  } = props;

  // const { t } = useTranslation('StudyList');

  const largeRowTemplate = (
    <tr
      onClick={() => handleClick(StudyInstanceUID)}
      style={{
        width: '100%',
        border: '1px solid #ddd',
        borderRadius: '5px',
        borderCollapse: 'initial',
      }}
    >
      <td>{UnityName}</td>
      <td>{RecordID}</td>
      <td colSpan="3">
        {PatientName ? PatientName : 'GABRIEL FREIRE DA SILVA DE SOUSA'}
      </td>
      {/* <td>{ExamType}</td> */}
      <td>{StudyDate}</td>
      <td colSpan="3">{ExamDescription}</td>
    </tr>
  );
  const mediumRowTemplate = (
    <tr
      onClick={() => handleClick(StudyInstanceUID)}
    >
      <td>{UnityName}</td>
      <td>{RecordID}</td>
      <td colSpan="3">
        {PatientName ? PatientName : 'GABRIEL FREIRE DA SILVA DE SOUSA'}
      </td>
      {/* <td>{ExamType}</td> */}
      <td>{StudyDate}</td>
      <td colSpan="3">{StudyDescription}</td>
    </tr>
  );
  const smallRowTemplate = (
    <tr
      onClick={() => handleClick(StudyInstanceUID)}
      style={{
        width: '100%',
        border: '1px solid #ddd',
        borderRadius: '5px',
        borderCollapse: 'initial',
      }}
    >
      <td>{UnityName}</td>
      <td>{RecordID}</td>
      <td colSpan="3">
        {PatientName ? PatientName : 'GABRIEL FREIRE DA SILVA DE SOUSA'}
      </td>
      {/* <td>{ExamType}</td> */}
      <td>{StudyDate}</td>
      <td colSpan="3">{ExamDescription}</td>
    </tr>
  );

  const rowTemplate = getContentFromUseMediaValue(
    displaySize,
    {
      large: largeRowTemplate,
      medium: mediumRowTemplate,
      small: smallRowTemplate,
    },
    smallRowTemplate
  );

  return rowTemplate;
}

TableRow.propTypes = {
  AccessionNumber: PropTypes.string.isRequired,
  isHighlighted: PropTypes.bool,
  modalities: PropTypes.string,
  PatientID: PropTypes.string.isRequired,
  PatientName: PropTypes.string.isRequired,
  StudyDate: PropTypes.string.isRequired,
  StudyDescription: PropTypes.string.isRequired,
  StudyInstanceUID: PropTypes.string.isRequired,
  displaySize: PropTypes.string,
};

TableRow.defaultProps = {
  isHighlighted: false,
};

export { StudyList };
