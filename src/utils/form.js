import React, { Fragment } from 'react';
import { Form, Input } from 'antd';
import _ from 'lodash';

const { Item: FormItem } = Form;

/**
 * 根据传入字段动态生成FormItem
 * @param {array|object} fields
 * @param {object} form
 */
export function genItems(fields, {
  getFieldDecorator
}) {
  fields = _.isArray(fields) ? fields : [fields];
  const items = [];
  fields.forEach((item) => {
    if (item.extra) {
      items.push(
        <Fragment key={item.key}>
          {item.component}
        </Fragment>
      );
    } else if (!item.hide) {
      items.push(
        <FormItem key={item.key} {...item.props}>
          {
            item.decorator !== false
              ? getFieldDecorator(
                item.key,
                item.decorator
              )(item.component || <Input />)
              : item.component || <Input />
          }
        </FormItem>
      );
    }
  });
  return items;
}
