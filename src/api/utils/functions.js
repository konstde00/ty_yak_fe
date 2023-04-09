import { getIn } from 'formik';

export const checkInputError = (form, accessor) => {
  const touched = getIn(form.touched, accessor);
  const error = getIn(form.errors, accessor);
  return [error, touched];
};

export const replaceUrl = (str, config) => {
  const values = Object.entries(config);
  return values?.reduce((acc, [key, value]) => {
    return acc.replace(`:${key}`, value);
  }, str);
};

export const createVolumesTableData = (list) => {
  const groupedObject = list?.reduce((acc, item) => {
    const uniqueKey = `${item.country} ${item.subgroupName} ${item.indicationName}`;
    return {
      ...acc,
      [uniqueKey]: acc[uniqueKey] ? [...acc[uniqueKey], item] : [item],
    };
  }, {});

  const rows = Object.values(groupedObject);

  return rows?.map((row, index) => {
    return row?.reduce((acc, { year, value, id, ...rest }) => {
      return {
        ...acc,
        ...rest,
        key: index,
        [year]: value || '',
      };
    }, {});
  }, []);
};

export const shouldShowIndication = (list) => {
  const uniqueId = list?.reduce(
    (acc, { indicationId }) => ({
      ...acc,
      [indicationId]: indicationId,
    }),
    {},
  );
  return Object.keys(uniqueId).length > 1;
};

export const onlyUnique = (value, index, self) => self.indexOf(value) === index;

export const emptyFunction = () => {};

export const hasArrayDiff = (initialArray, updatedArray, fieldNames) => {
  if (initialArray.length !== updatedArray.length) {
    return true;
  }

  for (let i = 0; i < initialArray.length; i += 1) {
    for (let j = 0; j < updatedArray.length; j += 1) {
      for (let k = 0; k < fieldNames.length; k += 1) {
        if (i === j && initialArray[i][fieldNames[k]] !== updatedArray[j][fieldNames[k]]) {
          return true;
        }
      }
    }
  }

  return false;
};
